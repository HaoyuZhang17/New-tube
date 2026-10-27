//定义后端有哪些tRPC API
import { createTRPCRouter} from "../init";
import { categoriesRouter } from "@/modules/categories/server/procedures";
export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;