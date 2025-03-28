import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function WeatherSkeleton() {
  return (
    <div className="space-y-6">
      {/* Current Weather Skeleton */}
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-6 w-20" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <Skeleton className="h-14 w-24" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Array(6)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <div>
                      <Skeleton className="h-3 w-20 mb-1" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Forecast Skeleton */}
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <CardHeader>
          <Skeleton className="h-7 w-40" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-2">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <Skeleton key={i} className="h-9 w-full" />
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Array(4)
                .fill(null)
                .map((_, i) => (
                  <Card key={i} className="bg-white/50 dark:bg-slate-700/50">
                    <CardContent className="p-4 flex flex-col items-center space-y-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <Skeleton className="h-6 w-12" />
                      <Skeleton className="h-3 w-20" />
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 w-full">
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-full" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
