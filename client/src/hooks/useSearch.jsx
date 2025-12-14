import { useMemo } from "react";
import { useDebounce } from "use-debounce";

export const useSearch = (data, searchTerm, options = {}) => {
  const { keys, debounceMs = 400 } = options;

  const [search] = useDebounce(searchTerm?.toLowerCase() || "", debounceMs);

  return useMemo(() => {
    if (!Array.isArray(data) || !search) return data || [];

    return data.filter((item) => {
      const source = keys
        ? keys.map((k) => item[k]).join(" ")
        : Object.values(item).join(" ");

      return source.toLowerCase().includes(search);
    });
  }, [data, search, keys]);
};
