import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { MainSection } from "./main-section";
import { Separator } from "@/components/ui/separator";
import { PersonalSection } from "./personal-section";


const HomeSidebar = () => {
    return (
        <Sidebar className="pt-16 z-40 border-none" collapsible="icon">
            {/* collapsible：在@/components/ui/sidebar写好的function，表示折叠后只显示icon */}
            <SidebarContent className="bg-background">
                <MainSection />
                {/* 这里只是一条横线 */}
                <Separator />
                <PersonalSection />
            </SidebarContent>
        </Sidebar>
    );
};

export default HomeSidebar;