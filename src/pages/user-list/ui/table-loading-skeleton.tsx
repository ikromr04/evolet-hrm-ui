import { SidebarMenuSkeleton, Skeleton } from '@/shared/ui';
import { JSX } from 'react';

function TableLoadingSkeleton(): JSX.Element {
  const columns = 8;
  const rows = 20;

  return (
    <div className="h-[calc(100vh-114px)] w-full overflow-hidden">
      <div className="flex border-b">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="p-3 flex-1">
            <SidebarMenuSkeleton className="h-4 min-w-24" />
          </div>
        ))}
      </div>

      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex border-b">
          {Array.from({ length: columns }).map((_, j) => (
            <div key={j} className="p-3 flex-1 min-w-40">
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export { TableLoadingSkeleton };
