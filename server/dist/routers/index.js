"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
// server/routers/_app.ts
const trpc_1 = require("../src/trpc");
const zod_1 = require("zod");
const user_1 = require("./user");
exports.appRouter = (0, trpc_1.router)({
    greeting: trpc_1.publicProcedure
        .input(zod_1.z.object({ name: zod_1.z.string().optional() }))
        .query(({ input }) => {
        return { message: `Hello, ${input.name ?? 'world'}!` };
    }),
    test2: trpc_1.publicProcedure
        .input(zod_1.z.object({ name: zod_1.z.string().optional() }))
        .query(({ input }) => {
        return { message: `Test Tambah router trpc` };
    }),
    profil: trpc_1.publicProcedure
        .input(zod_1.z.object({ name: zod_1.z.string(), age: zod_1.z.string(), role: zod_1.z.string() }))
        .query(({ input }) => {
        return {
            message: `Name: ${input.name} \n Age: ${input.age} \n Role: ${input.role}`
        };
    }),
    // example with supabase
    user: user_1.userRouter
    // tambahkan procedure lainnya di sini
});
