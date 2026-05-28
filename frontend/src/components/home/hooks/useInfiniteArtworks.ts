"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { EXPLORE_PAGE_SIZE } from "../data";
import type { ExploreArtwork } from "../types";

type UseInfiniteArtworksOptions = {
  items: ExploreArtwork[];
  pageSize?: number;
};

export function useInfiniteArtworks({
  items,
  pageSize = EXPLORE_PAGE_SIZE,
}: UseInfiniteArtworksOptions) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingMore) return;
    setIsLoadingMore(true);
    window.setTimeout(() => {
      setVisibleCount((count) => Math.min(count + pageSize, items.length));
      setIsLoadingMore(false);
    }, 600);
  }, [hasMore, isLoadingMore, items.length, pageSize]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleCount(pageSize);
  }, [items, pageSize]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: "240px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  return {
    visibleItems,
    hasMore,
    isLoadingMore,
    sentinelRef,
    loadMore,
  };
}
