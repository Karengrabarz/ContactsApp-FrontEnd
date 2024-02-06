import { z } from "zod";

const clientSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    telefone: z.string(),
    createdAt: z.date(),
    contacts: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        telefone: z.string(),
        createdAt: z.date(),
    }).array(),
})


export const clientUpdateSchema = clientSchema.pick({
    name:true,
    email:true,
    password: true,
    telefone: true

}).partial()