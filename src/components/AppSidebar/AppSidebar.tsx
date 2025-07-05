import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
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
  SidebarHeader
} from "../ui/sidebar";

type AppSidebarProps = {
  data_sources: {
    name: string,
    fields: {
      name: string,
      onClickCallback: () => void
    }[]
  }[]
} & React.ComponentProps<typeof Sidebar>

export function AppSidebar({ ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props} collapsible={"none"}>
      <SidebarHeader>
        Available Data
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {props.data_sources.map((source) => (
          <Collapsible
            key={source.name}
            title={source.name}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger>
                  {source.name}
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {source.fields.map((field) => (
                      <SidebarMenuItem key={field.name}>
                        <SidebarMenuButton asChild onClick={field.onClickCallback}>
                          {field.name}
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
  )
}
