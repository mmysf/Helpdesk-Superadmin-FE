/* eslint-disable no-unused-vars */

"use client";

import React from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  // PaginationNext,
  // PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/root/_app/helpers/utils";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface PaginationProps {
  totalData?: number;
  perPage?: number;
  currentPage?: number;
  hasLimit?: boolean;
  setCurrentPage?: (val: number) => void;
  setCurrentLimit?: (val: number) => void;
}

export default function PaginationWithoutLinks(props: PaginationProps) {
  const {
    totalData = 1,
    perPage = 10,
    currentPage = 1,
    hasLimit = false,
    setCurrentPage,
    setCurrentLimit,
  } = props;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalData / perPage); i += 1) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    if (perPage && setCurrentLimit) {
      setCurrentLimit(perPage);
    }
  }, [perPage, setCurrentLimit]);

  const maxPageNum = 3; // Maximum page numbers to display at once
  const pageNumLimit = Math.floor(maxPageNum / 2); // Current page should be in the middle if possible

  // eslint-disable-next-line prefer-const
  let activePages = pageNumbers.slice(
    Math.max(0, currentPage - 1 - pageNumLimit),
    Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length),
  );

  const firstPage = useMemo(() => {
    return currentPage === 1;
  }, [currentPage]);

  const lastPage = useMemo(() => {
    return currentPage === pageNumbers.length;
  }, [currentPage, pageNumbers.length]);

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length && setCurrentPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1 && setCurrentPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to render page numbers with ellipsis
  const renderPages = () => {
    const renderedPages = activePages.map((page) => (
      <PaginationItem
        key={page}
        className={cn(
          "cursor-pointer rounded-md",
          currentPage === page ? "bg-primary" : "border-[1px] border-slate-300",
        )}
      >
        <PaginationLink
          onClick={() => setCurrentPage && setCurrentPage(page)}
          className={cn(currentPage === page ? "text-white" : "")}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    ));

    // Add ellipsis at the start if necessary
    if (activePages[0] > 1) {
      renderedPages.unshift(
        <PaginationEllipsis
          key="ellipsis-start"
          // onClick={() => setCurrentPage(activePages[0] - 1)}
        />,
      );
    }

    // Add ellipsis at the end if necessary
    if (activePages[activePages.length - 1] < pageNumbers.length) {
      renderedPages.push(
        <PaginationEllipsis
          key="ellipsis-end"
          // onClick={() =>
          //   setCurrentPage(activePages[activePages.length - 1] + 1)
          // }
        />,
      );
    }

    return renderedPages;
  };

  return (
    <div className="flex items-center justify-between">
      {/* <div className="flex items-center justify-start w-full gap-2">
        <span className="text-sm tracking-wider text-neutral-600">
          {`Showing ${(currentPage - 1) * perPage + 1} to ${
            currentPage * perPage > totalData
              ? totalData
              : currentPage * perPage
          } of ${totalData} entries`}
        </span>
        <Button onClick={() => handleRefresh()} variant="ghost" size="sm">
          <RefreshCwIcon />
        </Button>
      </div> */}
      <div className="flex">
        {hasLimit && (
          <Select
            value={perPage.toString()}
            defaultValue="10"
            onValueChange={(value) => {
              if (setCurrentLimit) setCurrentLimit(Number(value));
              if (setCurrentPage) setCurrentPage(1);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select page size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="40">40</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        )}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                disabled={firstPage}
                onClick={handlePrevPage}
                size="sm"
                variant="outline"
              >
                <ChevronLeft className="w-5 h-5" />
                Prev
              </Button>
              {/* <PaginationPrevious
              onClick={handlePrevPage}
              className="cursor-pointer"
            /> */}
            </PaginationItem>

            {renderPages()}

            <PaginationItem>
              <Button
                disabled={lastPage || pageNumbers.length === 0}
                onClick={handleNextPage}
                size="sm"
                variant="outline"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </Button>
              {/* <PaginationNext
              onClick={handleNextPage}
              className="cursor-pointer"
            /> */}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
