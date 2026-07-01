// Sidebar 的“主菜单组件”，负责根据 items 数据，把 Home、Subscriptions、Trending 等导航项渲染出来。
"use client"
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar";
import {FlameIcon, HomeIcon, PlaySquareIcon} from "lucide-react"
import Link from "next/link";
import { useAuth, useClerk } from "@clerk/nextjs";
//useAuth可以返回用户当前认证状态
//useClerk可以给你操作clerk能力

//items：数组array
const items = [
    //{}:对象 object
    {
        title: "Home",
        url: "/",
        icon: HomeIcon
    },

    {
        title: "Subscriptions",
        url: "/feed/subscriptions",
        icon: PlaySquareIcon,
        //需要登录
        auth: true,
    },
    {
        title: "Trending",
        url: "/feed/trending",
        icon: FlameIcon,
    },
];

export const MainSection = () => {
    //取出clerk里面全部方法：
    const clerk = useClerk();
    //只用其中一个方法：const {openSignIn} = useClerk();
    const {isSignedIn} = useAuth();
    
    

    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {/* 遍历（iterate）items 数组，把数组里的每一个对象依次取出来，并临时命名为 item。 */}
                    {items.map((item) => (
                        // key 是 React 用来区分列表项的唯一标识
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                //鼠标悬停文字
                                tooltip={item.title}
                                //这里的意思是，将SidebarMenuButton的外观，行为，规则加到里面的link上
                                asChild
                                isActive = {false} //TODO: Change to look at current pathname

                                //e：点击事件
                                //判断没有登录并且items里的item auth=true
                                    //e.preventDefault();阻止跳转link
                                    //返回出登录框
                                onClick={(e) => {
                                    if (!isSignedIn && item.auth) {
                                        e.preventDefault();
                                        return clerk.openSignIn();
                                    }
                                }}
                            >
                                <Link href={item.url} className="flex items-center gap-4">
                                    <item.icon />
                                    <span className="text-sm">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

