import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";
import { SearchFilter } from "../types";

export default function Header() {

  const {pathname} = useLocation()

  const isHome = useMemo(() => pathname === '/' ,[pathname])
  
  const fetchCategories = useAppStore( (state) => state.fetchCategories )
  const searchRecipes = useAppStore( (state) => state.searchRecipes )
  const categories = useAppStore( (state) => state.categories )
  const showNotification = useAppStore( state => state.showNotification)

  const [searchFilter, setSearchFilter] = useState<SearchFilter>({
    ingredients: '',
    category: ''
  })
  
  useEffect(() => {
    fetchCategories()
  },[])


  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setSearchFilter({
      ...searchFilter,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault()

    // validations
    if(Object.values(searchFilter).includes('')){
      showNotification({
        text: "Todos los campos son obligatorios",
        error: true
      });
      return
    }

  // Consultar la API∫
  searchRecipes(searchFilter)

  }

  return (
    <header className={isHome ? "bg-header bg-no-repeat bg-center bg-cover" : "bg-slate-800"}>
        <div className="container mx-auto px-5 py-16">
            
            <div className="flex justify-between items-center">
                <img className="w-32" src="/logo.svg" alt="Page Logo" />

              <nav className="flex gap-4">
                <NavLink
                  to='/'
                  className={({isActive})=>
                   isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bold"
                  }>
                    home
                </NavLink>

                <NavLink
                  to='/favorites'
                  className={({isActive})=>
                    isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bold"
                   }>
                    favoritos
                </NavLink>
                
              </nav>
            </div>
            { isHome && (
              <form
                onSubmit={handleSubmit} 
                className="md:w-1/2 xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6">
                <div className="space-y-4">
                  <label 
                    htmlFor="ingredients"
                    className="block text-white uppercase font-bold text-lg"
                  >Nombre o ingredientes</label>
                  <input 
                    type="text"
                    className="p-3 w-full rounded-lg focus:outline-none"
                    name="ingredients"
                    id="ingredients"
                    placeholder="Nombre o Ingredientes. Ej: Vodka, tequila, café ..."
                    onChange={handleChange}
                    value={searchFilter.ingredients}
                  />
                </div>

                <div className="space-y-4">
                  <label 
                    className="block text-white uppercase font-bold text-lg"
                  >Categoría</label>
                  <select
                    className="p-3 w-full rounded-lg focus:outline-none"
                    name="category"
                    id="category"
                    onChange={handleChange}
                    value={searchFilter.category}
                  >
                    <option value="">-- Seleccione --</option>
                    {categories.drinks.map(category => (
                      <option key={category.strCategory} value={category.strCategory}>
                        {category.strCategory}
                      </option>
                    ))}
                  </select>
                </div>
                
                <input 
                  type="submit" 
                  value="buscar recetas"
                  className="bg-orange-800 hover:bg-orange-900 w-full uppercase text-white font-bold rounded-lg p-3"
                />
                
              </form>
            )}
        </div>
    </header>
  )
}
