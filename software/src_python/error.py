
import argparse
import pandas as pd
import numpy as np


def hamming_distance(s1, s2):
    """Assumes equal length"""
    return sum(c1 != c2 for c1, c2 in zip(s1, s2))

def infer_parents_hamming(
    df,
    seq_col="sequence_aa",
    count_col="log10_count",
    max_hd=2,
    min_ratio=100
):
    """
    df: DataFrame containing sequences and log10 counts
    seq_col: column name for amino acid sequence
    count_col: column name for log10(count)
    max_hd: max Hamming distance
    min_ratio: parent must be >= min_ratio more abundant than child
    """

    df = df.copy()

    # precompute length
    df["_length"] = df[seq_col].str.len()

    log10_ratio = np.log10(min_ratio)

    results = []

    for length, g in df.groupby("_length"):
        
        
        g = g.sort_values(count_col, ascending=False).reset_index(drop=True)

        seqs = g[seq_col].tolist()
        log_counts = g[count_col].tolist()

        for i in range(len(seqs)):
            child_seq = seqs[i]
            child_logc = log_counts[i]

            for j in range(i):  # higher-abundance candidates

                
                parent_seq = seqs[j]
                parent_logc = log_counts[j]

                log_diff = parent_logc - child_logc

                """
                if length==21 and hd<3:
                    
                    if log_diff < log10_ratio:
                        print('fail', hd, log_diff, child_seq, child_logc, parent_seq, parent_logc)
                    else:
                        print('pass', hd, log_diff, child_seq, child_logc, parent_seq, parent_logc)
                """
                # abundance constraint in log space
                if log_diff < log10_ratio:
                    continue

                hd = hamming_distance(child_seq, parent_seq)
                    
                if hd <= max_hd:
                    results.append({
                        "length": length,
                        "child_seq": child_seq,
                        "child_log10_count": child_logc,
                        "parent_seq": parent_seq,
                        "parent_log10_count": parent_logc,
                        "hamming_distance": hd
                    })

    return pd.DataFrame(results)


def run_stats():
    
    
    return filtered_clones


if __name__ == "__main__":
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
    

    seq_raw_count = clones.groupby(args.seq_col)[args.count_col].sum()
    log10_seq_raw_count = np.log10(seq_raw_count).reset_index()
    compare = infer_parents_hamming(
            log10_seq_raw_count,
            seq_col=args.seq_col,
            count_col=args.count_col,
            max_hd=args.max_hd,
            min_ratio=args.min_ratio)

    compare['log10_diff'] = compare.parent_log10_count - compare.child_log10_count
    log10_seq_filtered_count = log10_seq_raw_count[~log10_seq_raw_count[args.seq_col].isin(compare.child_seq)].copy()
    log10_seq_filtered_count = log10_seq_filtered_count[log10_seq_filtered_count[args.count_col]>np.log10(args.lower_cutoff)].copy()
    log10_seq_filtered_count = log10_seq_filtered_count[log10_seq_filtered_count[args.count_col]>np.log10(args.lower_cutoff)].copy()
    filtered_clones = clones[clones[args.seq_col].isin(log10_seq_filtered_count[args.seq_col])].drop_duplicates(args.seq_col)

    filtered_clones.to_csv(args.output_tsv, sep="\t", index=False)
    if args.output_keys_tsv:
        filtered_clones[["clonotypeKey"]].drop_duplicates().to_csv(
            args.output_keys_tsv,
            sep="\t",
            index=False,
        )
    print(f"Done: {len(filtered_clones)} clones written to {args.output_tsv}", flush=True)