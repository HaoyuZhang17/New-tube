//drizzle定义数据库表

//导入数据类型和工具
import {pgTable, text, timestamp, uniqueIndex, uuid} from "drizzle-orm/pg-core";

//pgTable("users" = create table users (...);
export const users = pgTable("users", {
    //定义每一列
        //UUID类型；pk；自动生成
    id: uuid("id").primaryKey().defaultRandom(),
    clerkId: text("clerk_id").unique().notNull(),
    name: text("name").notNull(),
    //TODO: add banner fields
    imageUrl: text("image_url").notNull(),
    //timestamp：时间；defaultNow： 创建时自动填
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

    //给 clerkId 建立唯一索引
    //t 不是 users，而是 pgTable() 在创建 users 表时，自动传进来的”当前表对象”。
}, (t) => [uniqueIndex("clerk_id_idx").on(t.clerkId)]);