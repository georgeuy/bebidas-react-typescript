import { z } from "zod"
import { categoriesAPIResponseSchema, DrinkAPIResponseSchema, DrinksAPIResponseSchema, RecipeAPIResponseSchema, SearchFilterSchema } from "../schemas/recipe-schema"

export type Categories = z.infer<typeof categoriesAPIResponseSchema>
export type SearchFilter = z.infer<typeof SearchFilterSchema>
export type Drinks = z.infer<typeof DrinksAPIResponseSchema>
export type Drink = z.infer<typeof DrinkAPIResponseSchema>
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>
