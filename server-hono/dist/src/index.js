"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const node_server_1 = require("@hono/node-server");
const fetch_1 = require("@trpc/server/adapters/fetch");
const routers_1 = require("../routers");
const app = new hono_1.Hono();
app.all("/api/trpc/*", async (c) => {
    return (0, fetch_1.fetchRequestHandler)({
        endpoint: "/api/trpc",
        req: c.req.raw,
        router: routers_1.appRouter,
        createContext: () => ({}),
    });
});
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: 3000,
});
console.log("🚀 Hono + tRPC server running at http://localhost:3000");
