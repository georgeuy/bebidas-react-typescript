import axios from "axios";
import { categoriesAPIResponseSchema, DrinksAPIResponseSchema, RecipeAPIResponseSchema } from "../schemas/recipe-schema";
import { Drink, SearchFilter } from "../types";


export async function getCategories() {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const {data} = await axios.get(url)
    const result = categoriesAPIResponseSchema.safeParse(data)
    if(result.success){
        return result.data
    }
}

export async function getRecipes(filter: SearchFilter){
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filter.ingredients}&c=${filter.category}`
    const {data} = await axios.get(url)
    const result = DrinksAPIResponseSchema.safeParse(data)
    if(result.success) return result.data
}

export async function getRecipeById(id: Drink['idDrink']){
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const {data} = await axios.get(url)
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
    if(result.success) return result.data
}
