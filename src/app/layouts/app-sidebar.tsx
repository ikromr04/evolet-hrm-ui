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
import { ChevronRight, House, MonitorSmartphone, TentTree, Users } from 'lucide-react';
import { JSX } from 'react';
import UserMenu from '@/widgets/user-menu';

function AppSidebar(): JSX.Element {
  const location = useLocation();

  return (
    <Sidebar collapsible="offcanvas" variant="inset">
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
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={location.pathname === ROUTES.HOME} asChild>
                  <Link className="group" to={ROUTES.HOME}>
                    <House className="group-data-[active='true']:text-[#a8cf45]" />
                    <span>Главная</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <Collapsible
                className="group/collapsible"
                defaultOpen={ROUTES.USER_LIST.startsWith(location.pathname) && (location.pathname !== '/')}
                asChild
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <Users />
                      <span>Сотрудники</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton isActive={location.pathname === ROUTES.USER_LIST} asChild>
                          <Link to={ROUTES.USER_LIST}>
                            <span>Текущие</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton isActive={location.pathname === ROUTES.USER_FIRED_LIST} asChild>
                          <Link to={ROUTES.USER_FIRED_LIST}>
                            <span>Уволенные</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton isActive={location.pathname === ROUTES.USER_TRANSFERRED_LIST} asChild>
                          <Link to={ROUTES.USER_TRANSFERRED_LIST}>
                            <span>Переведённые</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              <SidebarMenuItem>
                <SidebarMenuButton isActive={location.pathname === ROUTES.EQUIPMENT_LIST} asChild>
                  <Link className="group" to={ROUTES.EQUIPMENT_LIST}>
                    <MonitorSmartphone className="group-data-[active='true']:text-[#a8cf45]" />
                    <span>Оборудование</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton isActive={location.pathname === ROUTES.VACATION_LIST} asChild>
                  <Link className="group" to={ROUTES.VACATION_LIST}>
                    <TentTree className="group-data-[active='true']:text-[#a8cf45]" />
                    <span>Отпуски</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            Справочники
          </SidebarGroupLabel>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={location.pathname === ROUTES.DEPARTMENT_LIST} asChild>
                <Link className="group" to={ROUTES.DEPARTMENT_LIST}>
                  <span>Отделы/Департаменты</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={location.pathname === ROUTES.POSITION_LIST} asChild>
                <Link className="group" to={ROUTES.POSITION_LIST}>
                  <span>Должности</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={location.pathname === ROUTES.ROLE_LIST} asChild>
                <Link className="group" to={ROUTES.ROLE_LIST}>
                  <span>Позиции</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={location.pathname === ROUTES.LANGUAGE_LIST} asChild>
                <Link className="group" to={ROUTES.LANGUAGE_LIST}>
                  <span>Языки</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  );
}

export { AppSidebar };
