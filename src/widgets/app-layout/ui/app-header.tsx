import { Separator, SidebarTrigger } from '@/shared/ui';
import { JSX } from 'react';
import { ModeToggle } from './mode-toggle';
import { useHeader } from '@/shared/lib';

function AppHeader(): JSX.Element {
  const { title } = useHeader();

  return (
    <header className="sticky top-0 z-10 flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full h-full bg-background items-center gap-1 mxx-4 lg:gap-2 lg:mx-6">
        <SidebarTrigger className="-ml-1" />

        <Separator className="mx-2 my-auto data-[orientation=vertical]:h-4" orientation="vertical" />

        <h1 className="text-base font-medium">{title}</h1>

        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

export { AppHeader };
