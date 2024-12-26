import { ListResponse } from "@/declarations/api";
import { ResultItem, Suggestion } from "@/declarations/search";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch suggestions");
  }
  return response.json();
};

export function useSearch(query: string | undefined) {
  const { data, error, isLoading } = useSWR<ListResponse<ResultItem>>(
    query !== undefined ? `/api/queryResult?query=${query}` : null,
    fetcher
  );

  return {
    results: data,
    isLoading,
    error,
  };
}

export const useSearchSuggestion = (query: string) => {
  const { data, error, isLoading } = useSWR<Suggestion>(
    query.length > 0 ? `/api/suggestion?query=${query}` : null,
    fetcher
  );

  return {
    suggestions: data,
    isLoading,
    error,
  };
};
