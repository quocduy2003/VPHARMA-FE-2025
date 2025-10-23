export function LoadingSkeleton() {
  return (
    <div className="animate-pulse p-4 space-y-4">
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-48 bg-gray-300 rounded"></div>
    </div>
  );
}
