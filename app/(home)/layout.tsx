import { HomeLayout } from "@/modules/home/ui/layouts/home-layout";
import { homedir } from "os";

//这个layout只会影响home分组下的，而不是全局，也不会影响feed

interface LayoutProps {
    children: React.ReactNode;
};

const Layout = ({children}: LayoutProps) => {
    return (
        // 路由层(home)/layout只负责挂载业务层的HomeLayout;
        // 所有设计在业务层完成
        <HomeLayout>
            {children}
        </HomeLayout>
        
    );
};

export default Layout;
