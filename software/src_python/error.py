
import os
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
    seq_raw_count = clones.groupby(seq_col)[count_col].sum()
    
    
    log10_seq_raw_count = np.log10(seq_raw_count).reset_index()
    
    compare = infer_parents_hamming(
        log10_seq_raw_count,
        seq_col=seq_col,
        count_col=count_col,
        max_hd=max_hd,
        min_ratio=min_ratio)
    
    compare['log10_diff'] = compare.parent_log10_count - compare.child_log10_count
    log10_seq_filtered_count = log10_seq_raw_count[~log10_seq_raw_count[seq_col].isin(compare.child_seq)].copy()
    log10_seq_filtered_count = log10_seq_filtered_count[log10_seq_filtered_count[count_col]>np.log10(lower_cutoff)].copy()
    filtered_clones = clones[clones[seq_col].isin(log10_seq_filtered_count[seq_col])].drop_duplicates(seq_col)
    filtered_clones = filtered_clones[filtered_clones[count_col]>lower_cutoff].drop_duplicates(seq_col)
    
    return filtered_clones


if __name__ == "__main__":
    clones = pd.read_table('/Users/ehq3930/Downloads/PCPE1_VHH_01_005.clones_IGH.tsv.gz')
    lower_cutoff = 5
    seq_col="aaSeqCDR3" # this can con
    count_col="readCount"
    max_hd=2
    min_ratio=100

    filtered_clones = run_stats()
    print(filtered_clones)  
