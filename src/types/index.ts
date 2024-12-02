import { z } from "zod"
import { categoriesAPIResponseSchema } from "../schemas/recipe-schema"

export type Categories = z.infer<typeof categoriesAPIResponseSchema>