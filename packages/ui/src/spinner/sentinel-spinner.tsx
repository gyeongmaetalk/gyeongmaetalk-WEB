"use client";

import { useEffect, useRef } from "react";

import { cn } from "@gyeongmaetalk/utils";

import { Spinner } from "./spinner";

interface SentinelSpinnerProps {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  className?: string;
}

export function SentinelSpinner({
  fetchNextPage,
  hasNextPage,
  isLoading,
  isFetchingNextPage,
  className,
}: SentinelSpinnerProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(sentinelRef.current);

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <>
      {!isLoading && isFetchingNextPage && <Spinner className={cn("mx-auto", className)} />}
      <div ref={sentinelRef} />
    </>
  );
}
