"use client"
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar";
import {HistoryIcon, ListVideoIcon, ThumbsUpIcon} from "lucide-react"
import Link from "next/link";
import { useClerk, useAuth } from "@clerk/nextjs";

const items = [
    {
        title: "History",
        url: "/playlists/history",
        icon: HistoryIcon,
        auth: true,
    },

    {
        title: "Liked videos",
        url: "/playlists/liked",
        icon: ThumbsUpIcon,
        //需要登录
        auth: true,
    },
    {
        title: "All playlists",
        url: "/playlists",
        icon: ListVideoIcon,
        auth: true,
    },
];

export const PersonalSection = () => {
    const clerk = useClerk();
    const {isSignedIn} = useAuth();
    return (
        <SidebarGroup>
            <SidebarGroupLabel>You</SidebarGroupLabel>
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
                                onClick={(e) => {
                                    if (!isSignedIn && item.auth) {
                                        // 看到xxx(),是在执行一个函数；
                                        // 没有()，表示拿到函数本身不会执行；
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

