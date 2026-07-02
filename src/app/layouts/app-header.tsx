import { Separator, SidebarTrigger } from '@/shared/ui';
import { JSX } from 'react';
import { useMatches } from 'react-router-dom';
import CreateButton from '@/widgets/create-button';
import { ThemeToggler } from '@/shared/lib';

function AppHeader(): JSX.Element {
  const matches = useMatches();
  const current = matches[matches.length - 1];
  const title = (current.handle as { title?: string })?.title;

  return (
    <header className="sticky top-0 z-10 flex items-center gap-x-1 p-2 border-b bg-background rounded-t-xl md:gap-x-2 md:px-4">
      <SidebarTrigger className="w-max! h-max! border-none" />

      <Separator className="my-auto data-[orientation=vertical]:h-4" orientation="vertical" />

      <h1 className="text-base font-medium truncate mr-auto">
        {title}
      </h1>

      <ThemeToggler />

      <CreateButton />
    </header>
  );
}

export { AppHeader };
