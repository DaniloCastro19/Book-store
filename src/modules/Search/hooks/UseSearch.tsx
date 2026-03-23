import { useEffect, useState } from "react";
import { env } from "../../../env/environment.development";
import useDebounce from "../../../core/hooks/UseDebounce";

export default function useSearch() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const getVolumes = async () => {
      try {
        const response = await fetch(
          `${env.APIVolumesURl}?q=${debouncedQuery}&key=${env.booksAPIKey}`,
        );

        if (!response) {
          throw new Error("Error fetching query results");
        }

        const results = await response.json();

        console.log(results);
      } catch (error) {
        console.error(error);
      }
    };
    getVolumes();
  }, [debouncedQuery]);

  return {
    query,
    setQuery,
  }
}
