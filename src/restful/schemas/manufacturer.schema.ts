
import * as z from "zod";

export const ManufacturerSchema = z.object({
    name: z.string().nonempty(),
    country: z.string().nonempty(),
    website: z.string().nonempty(),
    description: z.string().nonempty(),
    address: z.string().nonempty(),
})
export const PartialManufacturerSchema = ManufacturerSchema.partial();
