import { useMemo } from "react";
import DrinkCard from "../components/DrinkCard";
import { useAppStore } from "../stores/useAppStore";

export default function FavoritePage() {

  const favorites = useAppStore(state => state.favorites)

  const hasFavorites = useMemo(()=> favorites.length, [favorites])

  return (
  <>
      <h1 className=" text-gray-600 text-5xl font-bold capitalize">tus tragos favoritos</h1>

      {hasFavorites ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
          {favorites.map( drink => (
            <DrinkCard 
              key={drink.idDrink}
              drink={drink}
            />
          ))}
        </div>
      ) : (
        <p className="text-2xl font-bold text-orange-900 mt-10">No has definido tus tragos favoritos aún</p>
      )}

    </>
  )
}
