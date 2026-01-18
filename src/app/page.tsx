"use client";

import { useGithubRepos } from "./hooks/useGithubRepos";
import RepoListItem from "./components/RepoListItem";
import InitialState from "./components/InitialState";

export default function Home() {
  const { repos, loading, error, page, hasNext, next, prev } = useGithubRepos(1);

  const initialState = (
    <InitialState loading={loading} error={error} hasData={repos.length > 0} />
  );
  if (initialState) return initialState;

  return (
    <main className="flex min-h-screen flex-col gap-6 p-8 justify-center items-center text-white">
      <header className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">GitHub Repository Listing</h1>
        </div>
        <span className="text-sm text-gray-300">Page {page}</span>
        {loading && <span className="text-sm text-gray-400">Loading…</span>}
      </header>

      <ul className="grid max-w-3xl w-full border rounded-lg border-[#3d444d]">
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
