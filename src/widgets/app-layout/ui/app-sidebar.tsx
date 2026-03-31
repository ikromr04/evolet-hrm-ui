import { Link, useLocation } from 'react-router-dom';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/shared/ui';
import { Favicon } from '@/shared/ui';
import { ROUTES } from '@/shared/config';
import { MAIN_NAV_ITEMS, REF_NAV_ITEMS } from '../model/const';
import { NavUser } from './nav-user';
import { ChevronRight } from 'lucide-react';

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="data-[slot=sidebar-menu-button]:p-1.5!" asChild>
              <Link to={ROUTES.HOME}>
                <Favicon />
                <span className="text-base font-semibold">Evolet Healthcare</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {MAIN_NAV_ITEMS.map(({ label, icon, route, submenus }) => {
                const Icon = icon;

                if (submenus) {
                  const isOpen = route.startsWith(location.pathname) && (location.pathname !== '/');
                  
                  return (
                    <Collapsible
                      className="group/collapsible"
                      asChild
                      defaultOpen={isOpen}
                      key={label}
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={label}>
                            <Icon />
                            <span>{label}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {submenus?.map(({ label, route }) => (
                              <SidebarMenuSubItem key={route}>
                                <SidebarMenuSubButton isActive={location.pathname.startsWith(route)} asChild>
                                  <Link to={route}>
                                    <span>{label}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={route}>
                    <SidebarMenuButton isActive={location.pathname === route} asChild>
                      <Link className="group" to={route}>
                        <Icon className="group-data-[active='true']:text-[#a8cf45]" />
                        <span>{label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            Справочники
          </SidebarGroupLabel>

          <SidebarMenu>
            {REF_NAV_ITEMS.map(({ label, route }) => (
              <SidebarMenuItem key={route}>
                <SidebarMenuButton isActive={location.pathname === route} asChild>
                  <Link className="group" to={route}>
                    <span>{label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

export { AppSidebar };
