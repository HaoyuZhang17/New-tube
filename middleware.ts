// 门卫作用，在所有页面之前统一处理
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
// createRouteMatcher可以理解成判断器
  // /protected路由需要保护
const isProtectedRoute = createRouteMatcher([
  // 如果只写/protected，那就只保护这个路由；
    //加上(.*),便可以保护包括这个路由已经以下的所有子路由
  "/protected(.*)",
]);

//所有请求会先来到这；先检查是否是判断器里的路由，如果是，保护这个页面
  //auth.protect()是clerk提供的方法，检查是否登录；
    // 已登录：直接访问page.tsx;
    // 未登录：重定向到登录页或触发 Clerk 登录流程
// async：允许在函数中使用 await。
// (auth, req) 是这个回调函数的参数。
// Clerk 在收到请求后，会调用这个回调，并自动把 auth（认证对象）和 req（请求对象）传进来。
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
