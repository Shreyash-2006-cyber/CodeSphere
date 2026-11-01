import React from 'react';
import styles from '../styles/LeetCode.module.css';

export default function LoadingSkeleton() {
  return (
    <div className={styles.skeletonContainer}>
      <div className={`${styles.skeletonBox} ${styles.skeletonProfile}`} />
      <div className={styles.skeletonGrid}>
        <div className={styles.skeletonBox} />
        <div className={styles.skeletonBox} />
        <div className={styles.skeletonBox} />
      </div>
    </div>
  );
}