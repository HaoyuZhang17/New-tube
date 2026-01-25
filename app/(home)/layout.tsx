import { HomeLayout } from "@/modules/home/ui/layouts/home-layout";

//这个layout只会影响home分组下的，而不是全局，也不会影响feed

interface LayoutProps {
    children: React.ReactNode;
};

const Layout = ({children}: LayoutProps) => {
    return (
        <HomeLayout>
            {children}
        </HomeLayout>
        
    );
};

export default Layout;
