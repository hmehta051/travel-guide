"use client";
import React from "react";
import styles from "../styles/Pagination.module.css";
import { PaginationProps } from "@/types/types";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift("...");
    }

    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }

    range.unshift(1);
    range.push(totalPages);

    return range;
  };

  return (
    <div className={styles.pagination}>
      {totalPages > 1 && (
        <ul>
          <li
            className={`${styles.pageItem} ${
              currentPage === 1 ? styles.disabled : ""
            }`}
            onClick={() => {
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            Previous
          </li>

          {getPageNumbers().map((page, index) => (
            <li
              key={index}
              className={`${styles.pageItem} ${
                page === currentPage ? styles.active : ""
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </li>
          ))}

          <li
            className={`${styles.pageItem} ${
              currentPage === totalPages ? styles.disabled : ""
            }`}
            onClick={() => {
              if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            Next
          </li>
        </ul>
      )}
    </div>
  );
};

export default Pagination;
