
import * as z from "zod";

export const ProductSchema = z.object({
    name: z.string().nonempty(),
    sku: z.string().nonempty(),
    description: z.string().nonempty(),
    price: z.number(),
    category: z.string().nonempty(),
    amountInStock: z.number()
})
export const PartialProductSchema = ProductSchema.partial();
