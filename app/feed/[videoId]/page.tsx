//PageProps 是页面的说明书，
//它约定了：这个页面会收到一个叫 params 的动态数据，
//而 params 里有一个 videoId，并且它是 string 类型
interface PageProps {
    params: Promise<{ videoId: string}>;
//  简写：
//     params: {
//     videoId: string;
//   };
}

// 定义了一个叫 Page 的异步页面组件，
// 它从 Next.js 传进来的 props 中解构出 params，
// 并且要求这些 props 符合 PageProps 的类型约定。
const Page = async ({params}: PageProps) => {

    //将解构前的数据params存入解构后的videoId
    //因为我要用videoid这一个值，所以我要再解构一遍
    const {videoId} = await params;

    return (
        <div>
            video ID: {videoId}
        </div>
    )
}

export default Page;