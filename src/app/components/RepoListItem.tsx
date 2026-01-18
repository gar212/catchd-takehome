type RepoListItemProps = {
  name: string;
  description: string | null;
  htmlUrl: string;
  stars: number;
  forks: number;
  updatedAt: string;
};

const RepoListItem = ({ name, description, htmlUrl, stars, forks, updatedAt }: RepoListItemProps) => {
  return (
    <li className="card p-4 border-t border-[#3d444db3]">
      <a href={htmlUrl} target="_blank" rel="noreferrer" className="mb-1 block">
        <div className="flex items-center gap-2">
          <span className="text-md text-[#4493f8] font-bold hover:underline">{name}</span>
          <span className="rounded-full border border-[#3d444d] text-[#9198a1] font-medium py-0.5 px-2 text-xs">
            Public
          </span>
        </div>
      </a>
      <p className="text-sm text-[#9198a1] mb-3">{description || "No description provided."}</p>
      <div className="text-[#9198a1] flex gap-4 text-xs">
        <span>Stars: {stars}</span>
        <span>Forks: {forks}</span>
        <span>Updated {new Date(updatedAt).toLocaleDateString()}</span>
      </div>
    </li>
  );
};

export default RepoListItem;