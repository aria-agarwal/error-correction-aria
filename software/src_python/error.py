
import argparse
import sys

import numpy as np
import pandas as pd


def hamming_distance(first_sequence, second_sequence):
    return sum(first != second for first, second in zip(first_sequence, second_sequence))


def infer_parents_hamming(dataframe, sequence_column, count_column, max_distance, min_ratio):
    dataframe = dataframe.copy()
    dataframe["_length"] = dataframe[sequence_column].str.len()
    log10_ratio = np.log10(min_ratio)
    results = []

    for length, group in dataframe.groupby("_length"):
        group = group.sort_values(count_column, ascending=False).reset_index(drop=True)
        sequences = group[sequence_column].tolist()
        log_counts = group[count_column].tolist()

        for child_index, child_sequence in enumerate(sequences):
            child_log_count = log_counts[child_index]
            for parent_index in range(child_index):
                parent_sequence = sequences[parent_index]
                parent_log_count = log_counts[parent_index]
                if parent_log_count - child_log_count < log10_ratio:
                    continue

                distance = hamming_distance(child_sequence, parent_sequence)
                if distance <= max_distance:
                    results.append({
                        "length": length,
                        "child_seq": child_sequence,
                        "parent_seq": parent_sequence,
                        "hamming_distance": distance,
                    })

    return pd.DataFrame(results)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input_tsv", required=True)
    parser.add_argument("--output_tsv", required=True)
    parser.add_argument("--output_keys_tsv", required=False, default=None)
    parser.add_argument("--seq_col", default="aaSeqCDR3")
    parser.add_argument("--count_col", default="readCount")
    parser.add_argument("--max_hd", type=int, default=2)
    parser.add_argument("--min_ratio", type=float, default=100)
    parser.add_argument("--lower_cutoff", type=float, default=5)
    args = parser.parse_args()

    clones = pd.read_table(args.input_tsv)
    required_columns = {"clonotypeKey", args.seq_col, args.count_col}
    missing_columns = required_columns - set(clones.columns)
    if missing_columns:
        raise ValueError(f"Input TSV is missing columns: {sorted(missing_columns)}")

    print(f"Received {len(clones)} input rows.", file=sys.stderr, flush=True)

    clones = clones.dropna(subset=[args.seq_col, args.count_col]).copy()
    clones[args.seq_col] = clones[args.seq_col].astype(str)
    clones[args.count_col] = pd.to_numeric(clones[args.count_col], errors="raise")

    seq_raw_count = clones.groupby(args.seq_col)[args.count_col].sum()
    print(
        f"Comparing {len(seq_raw_count)} unique sequences by Hamming distance.",
        file=sys.stderr,
        flush=True,
    )
    log10_seq_raw_count = np.log10(seq_raw_count).reset_index()
    compare = infer_parents_hamming(
        log10_seq_raw_count,
        sequence_column=args.seq_col,
        count_column=args.count_col,
        max_distance=args.max_hd,
        min_ratio=args.min_ratio,
    )

    child_sequences = compare["child_seq"] if not compare.empty else []
    surviving_sequences = log10_seq_raw_count[
        ~log10_seq_raw_count[args.seq_col].isin(child_sequences)
    ]
    surviving_sequences = surviving_sequences[
        surviving_sequences[args.count_col] > np.log10(args.lower_cutoff)
    ]
    filtered_clones = (
        clones[clones[args.seq_col].isin(surviving_sequences[args.seq_col])]
        .sort_values(args.count_col, ascending=False)
        .drop_duplicates(args.seq_col)
    )

    filtered_clones.to_csv(args.output_tsv, sep="\t", index=False)
    if args.output_keys_tsv:
        surviving_keys = filtered_clones[["clonotypeKey"]].drop_duplicates()
        surviving_keys.to_csv(args.output_keys_tsv, sep="\t", index=False)
    print(
        f"Done: {len(filtered_clones)} representative clones written to {args.output_tsv} "
        f"(from {len(surviving_sequences)} surviving sequences)",
        flush=True,
    )


if __name__ == "__main__":
    main()
    
