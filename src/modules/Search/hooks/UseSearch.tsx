import { useEffect, useState } from "react";
import { env } from "../../../env/environment.development";
import useDebounce from "../../../core/hooks/UseDebounce";
import type { BookVolume } from "../../../core/models/Book";
import { usePagination } from "../../Bookshelf/hooks/PaginationReducer";

export default function useSearch() {
  const [query, setQuery] = useState("");
  const [volumes, setVolumes] = useState<BookVolume[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [printType, setPrintType] = useState("all");
  const [orderBy, setOrderBy] = useState("relevance");

  const maxResults = 10;

  const [totalItems, setTotalItems] = useState(0);
  const totalPages = Math.ceil(totalItems / maxResults);

  const { page, nextPage, prevPage, resetPage, setPage } = usePagination();

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    setVolumes([]);
    resetPage();
    setHasMore(true);
  }, [debouncedQuery, printType, orderBy, resetPage]);

  useEffect(() => {
    const controller = new AbortController();
    const getVolumes = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          q: debouncedQuery.trim() || "intitle:story",
          printType,
          orderBy,
          startIndex: String(page * maxResults),
          maxResults: String(maxResults),
          key: env.booksAPIKey,
        });
        const response = await fetch(`${env.APIVolumesURl}?${params}`);

        if (!response.ok) {
          throw new Error("Error fetching query results");
        }

        const results = await response.json();
        const newItems: BookVolume[] = results.items || [];

        setVolumes(newItems);
        setTotalItems(results.totalItems ?? 0);
        setHasMore(newItems.length === maxResults);
      } catch (error) {
        console.error(error);
        setVolumes([]);
        setTotalItems(0);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };
    getVolumes();
    return () => controller.abort();
  }, [debouncedQuery, printType, orderBy, page]);

  return {
    search: {
      query,
      setQuery,
    },
    filters: {
      printType,
      setPrintType,
      orderBy,
      setOrderBy,
    },
    pagination: {
      page,
      totalPages,
      nextPage,
      prevPage,
      setPage,
      resetPage,
    },
    data: {
      volumes,
      hasMore,
      loading,
      totalItems,
    },
  };
}
