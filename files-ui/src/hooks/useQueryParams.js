import { useCallback } from "react";

export const useQueryParams = () => {
  const getQueryParam = useCallback((paramName) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(paramName);
  }, []);

  const setQueryParam = useCallback((paramName, value) => {
    const url = new URL(window.location);
    if (value) {
      url.searchParams.set(paramName, value);
    } else {
      url.searchParams.delete(paramName);
    }
    window.history.pushState({}, "", url);
  }, []);

  const clearQueryParams = useCallback(() => {
    const url = new URL(window.location);
    url.search = "";
    window.history.pushState({}, "", url);
  }, []);

  return {
    getQueryParam,
    setQueryParam,
    clearQueryParams,
  };
};
