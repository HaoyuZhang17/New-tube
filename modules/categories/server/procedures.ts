//创建一个“类别 API”，让前端可以获取数据库里的所有 categories

import {db} from "@/db";
import { categories } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
    //getMany: 获取很多条data
    //baseProcedure：所有人可以调用不用登录
    getMany: baseProcedure.query(async ()=> {
        const data = await db.select().from(categories);

        return data;
    }),
});

// categoriesRouter
// 类别相关 API
//       ↓
// 注册到
// appRouter
// 总 API
//       ↓
// 前端能通过
// trpc.categories.xxx
// 来调用