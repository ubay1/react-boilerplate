"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const supabase_1 = require("../src/supabase");
const zod_1 = require("zod");
const trpc_1 = require("../src/trpc");
exports.userRouter = (0, trpc_1.router)({
    getAllUser: trpc_1.publicProcedure.query(async () => {
        const { data, error } = await supabase_1.supabase.from('test').select('*');
        if (error)
            throw new Error(error.message);
        return data;
    }),
    getById: trpc_1.publicProcedure
        .input(zod_1.z.string())
        .query(async ({ input }) => {
        const { data, error } = await supabase_1.supabase.from('test').select('*').eq('id', input).single();
        if (error)
            throw new Error(error.message);
        return data;
    }),
    // example with supabase
    addUser: trpc_1.publicProcedure
        .input(zod_1.z.object({ name: zod_1.z.string(), age: zod_1.z.string(), role: zod_1.z.string() }))
        .mutation(async ({ input }) => {
        const { data, error } = await supabase_1.supabase.from('test').insert([input]).select().single();
        if (error)
            throw new Error(error.message);
        return data;
    }),
});
