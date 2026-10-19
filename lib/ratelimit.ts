import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis"

//只有给这个const export了，其他文件才能import这个const
export const ratelimit = new Ratelimit ({
    redis,
    limiter: Ratelimit.slidingWindow(10, "10s")
});