import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from '../routers';

const app = new Hono();

app.all("/api/trpc/*", async (c) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext: () => ({}),
  });
});


serve({
  fetch: app.fetch,
  port: 3000,
});

console.log("🚀 Hono + tRPC server running at http://localhost:3000");
