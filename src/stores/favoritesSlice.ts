import { StateCreator } from 'zustand'
import { Recipe } from '../types'
import { createRecipesSlice, RecipesSliceType } from './recipeSlice'
import { createNotificationSlice, NotificationSliceType } from './notificationSlice'

//tipo
export type FavoritesSliceType = {
    favorites: Recipe[],
    handleClickFavorite: (recipe:Recipe) => void,
    favoriteExists: (id: Recipe['idDrink']) => boolean,
    loadFromStorage: () => void
}

//slice
export const createFavoritesSlice: StateCreator<FavoritesSliceType & RecipesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
       // verificar si la receta ya se encuentra en el state
        if( get().favoriteExists(recipe.idDrink)){
            set( (state) => ({
                favorites: state.favorites.filter( favorite => favorite.idDrink !== recipe.idDrink)
            }) )
            createNotificationSlice(set, get, api).showNotification({text:'Trago eliminado de favoritos', error: false})
        }else{
            //agregar la receta a favoritos
            set( (state) => ({
                favorites: [...state.favorites, recipe]
            }) )
            createNotificationSlice(set, get, api).showNotification({text:'Trago agregado a favoritos', error: false})
        }

        localStorage.setItem('favorites', JSON.stringify(get().favorites))
        createRecipesSlice(set, get, api).closeModal()

    },
    favoriteExists: (id) => get().favorites.some(favorite => favorite.idDrink === id),
    loadFromStorage: () => {
        // obtener los favoritos de localStorage
        const storedFavorites = localStorage.getItem('favorites')
        if(storedFavorites){
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})