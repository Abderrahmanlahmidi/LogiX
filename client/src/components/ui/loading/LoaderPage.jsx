export const LoaderPage = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg">
      <div className="relative">
        <div className="h-16 w-16 border-4 border-secondary rounded-full"></div>
        <div className="absolute inset-0 h-16 w-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};