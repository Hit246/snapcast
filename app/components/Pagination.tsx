"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { cn, generatePagination, updateURLParams } from "../../lib/utils";

type PaginationProps = {
  currentPage?: number;
  totalPages?: number;
  queryString?: string;
  filterString?: string;
};

const Pagination = ({
  currentPage = 1,
  totalPages = 10,
  queryString = "",
  filterString = "",
}: PaginationProps) => {
  const pages = generatePagination(currentPage, totalPages);
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageUrl = (pageNumber: number) => {
    return updateURLParams(
      searchParams,
      {
        page: pageNumber.toString(),
        query: queryString.trim() || null,
        filter: filterString || null,
      },
      "/"
    );
  };

  const navigateToPage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    router.push(createPageUrl(pageNumber));
  };

  return (
    <section className="pagination flex items-center justify-center gap-4 my-6">
      <button
        onClick={() => navigateToPage(currentPage - 1)}
        className={cn(
          "nav-button flex items-center gap-2 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition",
          {
            "pointer-events-none opacity-50": currentPage === 1,
          }
        )}
        disabled={currentPage === 1}
        aria-disabled={currentPage === 1}
      >
        <Image
          src="/assets/icons/arrow-left.svg"
          alt="Previous"
          width={16}
          height={16}
        />
        Previous
      </button>

      <div className="flex items-center gap-2">
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => navigateToPage(page as number)}
              className={cn(
                "px-3 py-1 rounded hover:bg-gray-200 transition",
                {
                  "bg-pink-500 text-white font-semibold":
                    currentPage === page,
                }
              )}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => navigateToPage(currentPage + 1)}
        className={cn(
          "nav-button flex items-center gap-2 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition",
          {
            "pointer-events-none opacity-50": currentPage === totalPages,
          }
        )}
        disabled={currentPage === totalPages}
        aria-disabled={currentPage === totalPages}
      >
        Next
        <Image
          src="/assets/icons/arrow-right.svg"
          alt="Next"
          width={16}
          height={16}
        />
      </button>
    </section>
  );
};

export default Pagination;
