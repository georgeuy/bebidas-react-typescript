import { z } from "zod" 

export const categoriesAPIResponseSchema = z.object({
    drinks: z.array(z.object({
        strCategory: z.string()
    }))
})