"use client";

import { useEffect } from "react";
import { useGithubRepos } from "./hooks/useGithubRepos";
import RepoListItem from "./components/RepoListItem";
import InitialLoad from "./components/InitialLoad";

export default function Home() {
  const { repos, loading, error, page, hasNext, next, prev } = useGithubRepos(1);

  // Keyboard navigation for pagination
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (loading) return;
      if (event.key === "ArrowLeft" && page > 1) {
        event.preventDefault();
        prev();
      } else if ((event.key === "ArrowRight" || event.key === "ArrowDown") && hasNext) {
        event.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [hasNext, loading, next, page, prev]);

  const initialState = InitialLoad({
    loading,
    error,
    hasData: repos.length > 0,
  });
  if (initialState) return initialState;

  return (
    <main className="flex min-h-screen flex-col gap-6 p-8 justify-center items-center text-white">
      <header className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">GitHub Repository Listing</h1>
        </div>
        <span className="text-sm text-gray-300">Page {page}</span>
      </header>

      <section className="w-full max-w-3xl border rounded-lg border-[#3d444d] min-h-[1000px]">
        {loading ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <div className="flex items-center gap-3">
              <span
                className="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"
                aria-hidden="true"
              />
              <span className="text-sm text-gray-300" role="status">
                Loading…
              </span>
            </div>
          </div>
        ) : (
          <ul className="grid">
            {repos.map((repo) => (
              <RepoListItem
                key={repo.id}
                name={repo.name}
                description={repo.description}
                htmlUrl={repo.html_url}
                stars={repo.stargazers_count}
                forks={repo.forks_count}
                updatedAt={repo.updated_at}
              />
            ))}
          </ul>
        )}
      </section>

      <nav className="flex flex-wrap items-center gap-3" aria-label="Pagination">
        <button
          className="rounded bg-gray-800 px-3 py-2 text-sm disabled:opacity-50"
          onClick={prev}
          disabled={page === 1 || loading}
        >
          Previous
        </button>
        <button
          className="rounded bg-gray-800 px-3 py-2 text-sm disabled:opacity-50"
          onClick={next}
          disabled={!hasNext || loading}
        >
          Next
        </button>

      </nav>
    </main>
  );
}
