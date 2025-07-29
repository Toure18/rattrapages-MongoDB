import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(1),
  age: z.number().int().positive(),
})

export type UserInput = z.infer<typeof userSchema>
