import { Link } from 'react-router-dom';
import {
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
} from '@/shared/ui';
import { Favicon } from '@/shared/ui';
import { ROUTES } from '@/shared/config';
import { MAIN_NAV_ITEMS, REF_NAV_ITEMS } from '../model/const';
import { NavUser } from './nav-user';

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
              {MAIN_NAV_ITEMS.map(({ label, icon, route }) => {
                const Icon = icon;

                return (
                  <SidebarMenuItem key={route}>
                    <SidebarMenuButton isActive={window.location.pathname === route} asChild>
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
                <SidebarMenuButton isActive={window.location.pathname === route} asChild>
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
