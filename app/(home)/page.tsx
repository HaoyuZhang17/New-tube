import { HydrateClient, trpc } from "@/trpc/server"
import { HomeView } from "@/modules/home/ui/views/home-view";
//nextjs默认会把页面缓存/静态化
//如果数据库更新，会直接使用第一次prefetch的缓存
//所以要动态化，每次访问页面，都让服务器重新执行这个 prefetch
export const dynamic = "force-dynamic";

//；告诉page收到什么样子的参数
interface PageProps {
  //Promise：现在没拿到之后会拿到
  //如果有categorId，那它一定是string
  searchParams: Promise<{
    categoryId?: string;
  }>
}
export default async function Page({ searchParams }: PageProps) {
  const { categoryId } = await searchParams;
  //提前prefetch
  //这个要和client端请求的参数一样；这里是prefetch hello，client里我要hello这份数据
  void trpc.categories.getMany.prefetch();


  return (
    // pass the data from the server to the client side, like a bridge between server prefetch and client query
    <HydrateClient>
      <HomeView categoryId={categoryId} />
    </HydrateClient>
  )
}
