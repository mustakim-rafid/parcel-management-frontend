import { Skeleton } from "@/components/ui/skeleton";

export function UniversalSkeleton() {
  return (
    <div className="w-full max-w-screen p-4 mx-auto">
      <div className="border rounded-lg p-6 space-y-4">
        <Skeleton className="h-10 w-1/3" />
        <div className="space-y-2">
          <Skeleton className="h-40 w-full" />
        </div>
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-5 w-1/3" />
      </div>
    </div>
  );
}
