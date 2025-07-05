import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarHeader,
} from "../ui/sidebar";
import { ChevronRight } from "lucide-react";

export type AppSidebarDataSources = {
  name: string;
  fields: {
    name: string;
    onClickCallback: () => void;
  }[];
}[];

type AppSidebarProps = {
  data_sources: AppSidebarDataSources;
} & React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props} collapsible={"none"}>
      <SidebarHeader>Available Data</SidebarHeader>
      <SidebarContent className="gap-0">
        {props.data_sources.map((source) => (
          <Collapsible
            key={source.name}
            title={source.name}
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm text-bold"
              >
                <CollapsibleTrigger>
                  {source.name}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {source.fields.map((field) => (
                      <SidebarMenuItem key={field.name}>
                        <SidebarMenuButton
                          asChild
                          onClick={field.onClickCallback}
                          className="pl-5"
                        >
                          <a>
                            {field.name}
                            {""}
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
