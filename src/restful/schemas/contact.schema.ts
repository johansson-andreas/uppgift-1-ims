import * as z from "zod";

export const ContactSchema = z.object({
    name: z.string().nonempty(),
    email: z.email().nonempty(),
    phone: z.number()
})
export const PartialContactSchema = ContactSchema.partial();