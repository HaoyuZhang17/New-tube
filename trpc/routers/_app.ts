//定义后端有哪些tRPC API

import { z } from "zod";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";


export const appRouter = createTRPCRouter({
    //定义hello接口 
  hello: protectedProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
        console.log({ dbUser: opts.ctx.user})
        
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;