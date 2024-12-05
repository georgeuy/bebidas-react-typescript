import { useAppStore } from "../stores/useAppStore"
import type { Drink } from "../types"

type DrinkProps = {
    drink: Drink
}

export default function DrinkCard({drink}:DrinkProps) {
  
  const selectRecipe = useAppStore( (state) => state.selectRecipe)
    
  return (
    <div className="border shadow-lg">
      <div className=" overflow-hidden">
        <img 
          src={drink.strDrinkThumb} 
          alt={drink.strDrink}
          className="hover:scale-125 hover:rotate-2 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <h2 className="text-2xl truncate font-bold text-gray-600">{drink.strDrink}</h2>
        <button
          type="button"
          className="bg-orange-400 hover:bg-orange-500 p-3 font-bold text-white mt-5 w-full"
          onClick={() => selectRecipe(drink.idDrink)}
        >Ver Receta</button>
      </div>
    </div>
  )
}
