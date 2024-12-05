import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"

export default function IndexPage() {
  
  const drinks = useAppStore( (state) => state.drinks )

  const hasDrinks = useMemo( () => drinks.drinks.length, [drinks] )

  return (
    <>
       <h1 className="text-6xl font-bold text-gray-600">Recetas</h1>

        { hasDrinks ? (
          <>
            <p className="my-6 text-orange-700 font-bold text-2xl">{drinks.drinks.length} recetas encontradas</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
              {drinks.drinks.map( drink => (
                <DrinkCard 
                  key={drink.idDrink}
                  drink={drink}
                />
              ))}
            </div>
          </>
        ) : (
          <p className="my-10 text-center text-2xl">No hay resultados aún, usa el formulario para buscar recetas</p>
        )}

    </>
  )
}
