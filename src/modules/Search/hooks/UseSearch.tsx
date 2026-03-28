import { useEffect, useState } from "react";
import { env } from "../../../env/environment.development";
import useDebounce from "../../../core/hooks/UseDebounce";
import type { BookVolume } from "../../../core/models/Book";

export default function useSearch() {
  const [query, setQuery] = useState("");
  const [volumes, setVolumes] = useState<BookVolume[]>([]);
  const [loading, setLoading] = useState(false);

  const [printType, setPrintType] = useState("all");
  const [orderBy, setOrderBy] = useState("relevance");
  const [page, setPage] = useState(0);
  const maxResults = 10;

  const debouncedQuery = useDebounce(query, 500);
  const params = new URLSearchParams({
    q: debouncedQuery.trim() || "intitle:story",
    printType,
    orderBy,
    startIndex: String(page * maxResults),
    maxResults: String(maxResults),
    key: env.booksAPIKey,
  });

  useEffect(() => {
    const getVolumes = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${env.APIVolumesURl}?${params.toString()}`,
        );

        if (!response.ok) {
          throw new Error("Error fetching query results");
        }

        const results = await response.json();
        console.log(results);
        setVolumes(results.items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getVolumes();
  }, [debouncedQuery, printType, orderBy, page, maxResults]);

  return {
    query,
    setQuery,
    volumes,
    loading,
    printType,
    setPrintType,
    orderBy,
    setOrderBy,
    page,
    setPage,
  };
}
