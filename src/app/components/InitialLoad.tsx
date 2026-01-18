type InitialLoadProps = {
  loading: boolean;
  error: string | null;
  hasData: boolean;
};

const InitialLoad = ({ loading, error, hasData }: InitialLoadProps) => {
  if (loading && !hasData) {
    return (
      <></>
    );
  }

  if (error && !hasData) {
    return (
    <main className="flex min-h-screen items-center justify-center">
        <div className="rounded border border-red-500/50 bg-red-900/30 px-4 py-3 text-sm text-red-100 max-w-3xl mx-6">
          {error}
        </div>
      </main>
    );
  }

  return null;
};

export default InitialLoad;
