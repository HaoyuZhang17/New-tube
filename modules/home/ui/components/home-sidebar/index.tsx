import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { MainSection } from "./main-section";
import { Separator } from "@/components/ui/separator";


const HomeSidebar = () => {
    return (
        <Sidebar className="pt-16 z-40 border-none">
            <SidebarContent className="bg-background">
                <MainSection />
                //这里只是一条横线
                <Separator />
                <MainSection />
            </SidebarContent>
        </Sidebar>
    );
};

export default HomeSidebar;