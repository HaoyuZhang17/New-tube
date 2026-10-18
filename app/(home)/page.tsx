
import { trpc } from "@/trpc/server"

export default async function Home() {

  const data = await trpc.hello({ text:"James"})
  return (
    <div>
      client component says: {data.greeting}
    </div>
  )
}
