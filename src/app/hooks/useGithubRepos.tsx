import { useEffect, useState, useCallback } from "react";

type Repo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
};

const PER_PAGE = 10;

export function useGithubRepos(initialPage = 1) {
  const [page, setPage] = useState<number>(initialPage);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(true);

  const load = useCallback(async (nextPage: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.github.com/orgs/github/repos?sort=name&per_page=${PER_PAGE}&page=${nextPage}`
      );
      if (!res.ok) {
        let apiMessage: string | undefined;
        try {
          const body = await res.json();
          if (body) {
            apiMessage = body.message;
          }
        } catch {}
        const fallback = `Request failed: ${res.status} ${res.statusText}`;
        throw new Error(apiMessage ?? fallback);
      }
      const data: Repo[] = await res.json();
      setRepos(data);
      setHasNext(data.length === PER_PAGE);
      setPage(nextPage);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(initialPage);
  }, [initialPage, load]);

  const next = () => hasNext && !loading && load(page + 1);
  const prev = () => page > 1 && !loading && load(page - 1);

  return { repos, loading, error, page, hasNext, next, prev};
}