import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from '@/db';
import {users} from '@/db/schema'
import { eq } from "drizzle-orm";

//这个api专门接收post请求
export async function POST(req: Request) {

  //拿到webhook密钥
  const WEBHOOK_SECRET = process.env.CLERK_SIGNING_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add CLERK_SIGNING_SECRET from Clerk Dashboard to .env or .env. local");
  }

  // Create new Svix instance with secret

  const wh = new Webhook(WEBHOOK_SECRET)

  // Get Header
  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  //Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", {
      status: 400,
    });
  }

  
  const eventType = evt.type;

  if (eventType === "user.created") {
    const {data} = evt

    await db.insert(users).values({
      clerkId: data.id,
      name: `${data.first_name} ${data.last_name}`,
      imageUrl: data.image_url,
    })
  }

  if (eventType === "user.deleted") {
    const {data} = evt;

    if (!data.id) {
      return new Response("Missing user id", {status : 400}); 
    }

    await db.delete(users).where(eq(users.clerkId, data.id));
  }

  if (eventType === "user.updated") {
    const {data} = evt;

    await db.update(users).set({
      name: `${data.first_name} ${data.last_name}`,
      imageUrl: data.image_url,
    })
    .where(eq(users.clerkId, data.id));
  }

  return new Response('Webhook received', { status: 200 });
}