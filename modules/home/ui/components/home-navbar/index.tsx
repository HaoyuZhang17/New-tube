import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import SearchInput from "./search-input";
import AuthButton from "@/modules/auth/ui/components/auth-button";

const HomeNavbar = () => {
    return (
        //fixed top-0 left-0 right-0:
        //固定在页面最顶部
        //items-center
        //内容垂直居中
        //z-50
        //层级很高，保证在最上面
        <nav className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-2 pr-5 z-50">
            <div className="flex items-center gap-4 w-full">
                {/* Menu and Logo */}
                {/* shrink-0: 不允许logo被缩小 */}
                <div className="flex items-center shrink-0">
                    <SidebarTrigger />
                    <Link href="/">
                        <div className="p-4 flex items-center gap-1">
                            <Image src="/logo.svg" alt="Logo" width={32} height={32} />
                            {/* tracking-tight: 等于letter-spacing */}
                            <p className="text-xl font-semibold tracking-tight">NewTube</p>
                        </div>

                    </Link>
                </div>

                {/* Search bar */}
                <div className="flex-1 flex justify-center max-w-[720px] mx-auto">
                    <SearchInput />
                </div>

                <div className="shrink-0 items-center flex gap-4">
                    <AuthButton />
                </div>

            </div>
        </nav>

    )
}

export default HomeNavbar; 