"use client";

import React from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}) => {
  if (totalPages <= 1 || isLoading) return null;

  const renderPageButtons = () => {
    const items: React.ReactNode[] = [];

    // Page 1
    items.push(
      <button
        key={1}
        onClick={() => onPageChange(1)}
        className={`flex h-10 w-10 items-center justify-center rounded-full border transition font-medium ${
          currentPage === 1
            ? "bg-primary border-primary text-white"
            : "bg-white border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
        }`}
      >
        1
      </button>
    );

    // Pagination logic (ellipsis + middle pages)
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage === totalPages) start = Math.max(2, totalPages - 2);
    if (currentPage <= 3) end = Math.min(4, totalPages - 1);

    if (start > 2) items.push(<span key="dots-1" className="px-1 text-gray-400">…</span>);

    for (let p = start; p <= end; p++) {
      items.push(
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`flex h-10 w-10 items-center justify-center rounded-full border transition font-medium ${
            currentPage === p
              ? "bg-primary border-primary text-white"
              : "bg-white border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
          }`}
        >
          {p}
        </button>
      );
    }

    if (end < totalPages - 1) items.push(<span key="dots-2" className="px-1 text-gray-400">…</span>);

    // Last Page
    items.push(
      <button
        key={totalPages}
        onClick={() => onPageChange(totalPages)}
        className={`flex h-10 w-10 items-center justify-center rounded-full border transition font-medium ${
          currentPage === totalPages
            ? "bg-primary border-primary text-white"
            : "bg-white border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
        }`}
      >
        {totalPages}
      </button>
    );

    return items;
  };

  return (
    <div className="mt-16 flex items-center justify-center gap-2">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 shadow-sm transition hover:bg-primary hover:text-white hover:border-primary disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-600"
      >
        <FiArrowLeft />
      </button>

      {/* Page Buttons */}
      {renderPageButtons()}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 shadow-sm transition hover:bg-primary hover:text-white hover:border-primary disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-600"
      >
        <FiArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
