import { supabase } from '../src/supabase'
import { z } from 'zod'
import { publicProcedure, router } from '../src/trpc'

export const userRouter = router({
  getAllUser: publicProcedure.query(async () => {
    const { data, error } = await supabase.from('test').select('*')
    if (error) throw new Error(error.message)
    return data
  }),

  getById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const { data, error } = await supabase.from('test').select('*').eq('id', input).single()
      if (error) throw new Error(error.message)
      return data
    }),

  // example with supabase
  addUser: publicProcedure
    .input(z.object({ name: z.string(), age: z.string(), role: z.string() }))
    .mutation(async ({ input }) => {
      const { data, error } = await supabase.from('test').insert([input]).select().single()
      if (error) throw new Error(error.message)
      return data
    }),
})
