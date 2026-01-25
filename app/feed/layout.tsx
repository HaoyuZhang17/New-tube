interface LayoutProps {
    children: React.ReactNode;
    //React.ReactNode表示react能渲染的任何内容
}

const Layout = ({children}: LayoutProps) => {
    return (
        <div>
            {children}
        </div>
    )
    //这里不像是page.tsx二次解构是因为我们只用children，也就是全部值，不需要某一个值
}

export default Layout;