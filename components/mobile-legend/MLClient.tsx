"use client";

import { useMemo, useState } from "react";
import { AccountCard } from "@/components/ui/account-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COLLECTOR_LEVELS } from "@/lib/constants";
import { useRouter } from "next/navigation";

interface Account {
  id: string;
  title: string;
  price: number;
  images: string[];
  category: string;
  collector_level?: string;
  is_sold: boolean;
}

interface Props {
  accounts: Account[];
  total: number;
  page: number;
  pageSize: number;
  setPage: (page: any) => void;
}

// Price ranges
const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity, value: "all" },
  { label: "10,000 - 100,000 MMK", min: 10000, max: 100000, value: "10k-100k" },
  {
    label: "100,000 - 200,000 MMK",
    min: 100000,
    max: 200000,
    value: "100k-200k",
  },
  {
    label: "200,000 - 300,000 MMK",
    min: 200000,
    max: 300000,
    value: "200k-300k",
  },
  {
    label: "300,000 - 500,000 MMK",
    min: 300000,
    max: 500000,
    value: "300k-500k",
  },
  {
    label: "500,000 - 1,000,000 MMK",
    min: 500000,
    max: 1000000,
    value: "500k-1m",
  },
  { label: "1,000,000+ MMK", min: 1000000, max: Infinity, value: "1m+" },
];

export default function MLClient({
  accounts,
  total,
  page,
  pageSize,
  setPage,
}: Props) {
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const router = useRouter();

  const filteredAccounts = useMemo(() => {
    let filtered = accounts;

    // Filter by collector level
    if (selectedLevel !== "all") {
      filtered = filtered.filter((a) => a.collector_level === selectedLevel);
    }

    // Filter by price range
    if (selectedPriceRange !== "all") {
      const range = PRICE_RANGES.find((r) => r.value === selectedPriceRange);
      if (range) {
        filtered = filtered.filter(
          (a) => a.price >= range.min && a.price <= range.max,
        );
      }
    }

    return filtered;
  }, [accounts, selectedLevel, selectedPriceRange]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Reset page when filters change
  const handleLevelChange = (value: string) => {
    setSelectedLevel(value);
    setPage(1);
  };

  const handlePriceChange = (value: string) => {
    setSelectedPriceRange(value);
    setPage(1);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        {/* Filter Section */}
        <div className="flex flex-row gap-3 w-full">
          {/* Collector Level Filter */}
          <div className="w-full sm:w-64">
            <Select value={selectedLevel} onValueChange={handleLevelChange}>
              <SelectTrigger className="bg-white/50 dark:bg-black/20 backdrop-blur-sm border-primary/20">
                <SelectValue placeholder="Sort by Collector Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {COLLECTOR_LEVELS.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range Filter */}
          <div className="w-full sm:w-64">
            <Select
              value={selectedPriceRange}
              onValueChange={handlePriceChange}
            >
              <SelectTrigger className="bg-white/50 dark:bg-black/20 backdrop-blur-sm border-primary/20">
                <SelectValue placeholder="Filter by Price" />
              </SelectTrigger>
              <SelectContent>
                {PRICE_RANGES.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        {/* <div className="text-sm text-muted-foreground whitespace-nowrap">
          Showing {filteredAccounts.length} of {accounts.length} accounts
        </div> */}
      </div>

      {/* Active Filters Display */}
      {(selectedLevel !== "all" || selectedPriceRange !== "all") && (
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-xs text-muted-foreground">Active filters:</span>
          {selectedLevel !== "all" && (
            <div className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
              {selectedLevel}
              <button
                onClick={() => handleLevelChange("all")}
                className="hover:text-primary/70 ml-1"
              >
                ×
              </button>
            </div>
          )}
          {selectedPriceRange !== "all" && (
            <div className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
              {PRICE_RANGES.find((r) => r.value === selectedPriceRange)?.label}
              <button
                onClick={() => handlePriceChange("all")}
                className="hover:text-primary/70 ml-1"
              >
                ×
              </button>
            </div>
          )}
          <button
            onClick={() => {
              handleLevelChange("all");
              handlePriceChange("all");
            }}
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredAccounts.map((account, index) => (
          <AccountCard
            key={account.id}
            index={index}
            id={account.id}
            title={account.title}
            price={account.price}
            images={account.images}
            category={account.category}
            collectorLevel={account.collector_level}
            isSold={account.is_sold}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredAccounts.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg mb-2">No accounts found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      )}

      {/* Pagination Controls */}
      {filteredAccounts.length > 0 && (
        <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
          <button
            className="px-3 py-1 rounded border border-primary/20 hover:bg-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setPage((p: any) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </button>

          {/* page numbers */}
          <div className="flex gap-1 flex-wrap">
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  className={`px-3 py-1 rounded border transition-colors ${
                    pageNum === page
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-primary/20 hover:bg-primary/10"
                  }`}
                  onClick={() => setPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            className="px-3 py-1 rounded border border-primary/20 hover:bg-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setPage((p: any) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
