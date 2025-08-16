import z from "zod";

export const schemaTest = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters long",
  }),
});