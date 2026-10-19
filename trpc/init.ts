//这个文件初始化、配置 tRPC---Context、superjson 等

// async 函数
//    ↓
// Promise<数据>

// 要数据 → await
// 要数据的类型 → Awaited


import { auth } from '@clerk/nextjs/server';
import { initTRPC, TRPCError } from '@trpc/server';
import { cache } from 'react';
import superjson from "superjson";
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';


//上下文的作用：每次trpc请求时，给后端的procedure准备一份这个请求的公共信息
export const createTRPCContext = cache(async () => {
    //将clerk的userId，通过context，更名为clerkUserId
    const { userId } = await auth();
    return { clerkUserId: userId };
});

//让 Context 的类型 = createTRPCContext 最终 return 出来的数据的类型。
//这里的Context只是一个描述这个数据是什么样的type
export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.

//以后我的所有 tRPC procedure，ctx 都是这个 Context 类型。
const t = initTRPC.context<Context>().create({

    //   transformer: superjson = 让 tRPC 更完整地转换前后端传输的数据。
    transformer: superjson,
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
//必须登录才能使用的procedure
//opts是trpc在执行的时候自动给的参数
export const protectedProcedure = t.procedure.use(async function isAuthed(opts) {

    // 从 opts 中拿到当前请求的 context
    const { ctx } = opts;
    //如果其中不包含id，报错（检察登录）
    if (!ctx.clerkUserId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    //否则继续执行api
    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.clerkId, ctx.clerkUserId))
        .limit(1)
    //检查登录的id是否存在数据库
    if (!user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    //next：继续执行后续procedure
    //...ctx users 就是把原来的 context 和 users 继续传下去
    return opts.next({
        ctx: {
            ...ctx,
            user,
        }
    })
});