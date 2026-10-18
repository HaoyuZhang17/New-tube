"use client";

import { trpc } from "@/trpc/client";

export const PageClient = () => {
    //read data
    //这里useSuspenseQuery是因为server的<Suspense/>,所以数据没准备好时可以直接用suspense里的状态；如果是usequery，那就要
    // const { data, isLoading } = trpc.hello.useQuery({
    //   text: "James",
    // });
    // if (isLoading) {
    //   return <p>Loading...</p>;
    // }
    const [data] = trpc.hello.useSuspenseQuery({
        text: "James",
    });

    return (
        <div>
            Page Client says: {data.greeting}
        </div>
    );
};