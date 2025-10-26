"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/ui/pagination";
import { useSearchParams } from 'next/navigation';

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function PaginationComponent({ currentPage, totalPages }: Props) {
  const searchParams = useSearchParams();

  // Create href for a specific page
  const createPageHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    return `?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push('ellipsis');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('ellipsis');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {currentPage > 1 ? (
            <PaginationPrevious href={createPageHref(currentPage - 1)} />
          ) : (
            <span className="pointer-events-none opacity-50">
              <PaginationPrevious href="#" />
            </span>
          )}
        </PaginationItem>

        {pageNumbers.map((pageNum, index) => {
          if (pageNum === 'ellipsis') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href={createPageHref(pageNum)}
                isActive={currentPage === pageNum}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          {currentPage < totalPages ? (
            <PaginationNext href={createPageHref(currentPage + 1)} />
          ) : (
            <span className="pointer-events-none opacity-50">
              <PaginationNext href="#" />
            </span>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}