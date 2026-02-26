"use client"
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar";
import {FlameIcon, HomeIcon, PlaySquareIcon} from "lucide-react"
import Link from "next/link";

const items = [
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
    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        // key 是 React 用来区分列表项的唯一标识
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                //鼠标悬停文字
                                tooltip={item.title}
                                //这里的意思是，将SidebarMenuButton的外观，行为，规则加到里面的link上
                                asChild
                                isActive = {false}
                                onClick={() => {}}
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

