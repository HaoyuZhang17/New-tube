import { HydrateClient, trpc } from "@/trpc/server"
import { PageClient } from "./client"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

export default async function Home() {

  //提前prefetch hello
  //这个要和client端请求的参数一样；这里是prefetch hello，client里我要hello这份数据
  void trpc.hello.prefetch({ text: "James" })


  return (
    // pass the data from the server to the client side, like a bridge between server prefetch and client query
    <HydrateClient>
      {/* when the data from client is not ready, show Loading...first */}
      <Suspense fallback={<p>Loading...</p>}>
      {/* instead crash the page, show Error... if we get error */}
      <ErrorBoundary fallback={<p>Error...</p>}>
        <PageClient />
      </ErrorBoundary>
        
      </Suspense>
    </HydrateClient>
  )
}
