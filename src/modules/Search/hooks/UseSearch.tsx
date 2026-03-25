import { useEffect, useState } from "react";
import { env } from "../../../env/environment.development";
import useDebounce from "../../../core/hooks/UseDebounce";
import type { BookVolume } from "../../../core/models/Book";

export default function useSearch() {
  const [query, setQuery] = useState("");
  const [volumes, setvolumes] = useState<BookVolume[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const getVolumes = async () => {
      const searchTerm = debouncedQuery.trim() || "intitle:story";
      try {
        setLoading(true);

        const response = await fetch(
          `${env.APIVolumesURl}?q=${encodeURIComponent(searchTerm)}&key=${env.booksAPIKey}`,
        );

        if (!response.ok) {
          throw new Error("Error fetching query results");
        }

        const results = await response.json();
        console.log(results);
        setvolumes(results.items);
      } catch (error) {
        console.error(error);
        setvolumes([]);
      } finally {
        setLoading(false);
      }
    };
    getVolumes();
  }, [debouncedQuery]);

  return {
    query,
    setQuery,
    volumes,
    loading,
  };
}
