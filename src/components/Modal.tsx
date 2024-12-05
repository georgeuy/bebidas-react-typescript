import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { Recipe } from '../types';

export default function Modal() {
  const modal = useAppStore( (state) => state.modal )
  const closeModal = useAppStore( (state) => state.closeModal )
  const selectedRecipe = useAppStore( (state) => state.selectedRecipe )
  const handleClickFavorite = useAppStore( (state) => state.handleClickFavorite )
  const favoriteExists = useAppStore( (state) => state.favoriteExists )

  const renderIngredients = ():JSX.Element[] => {
    const ingredients: JSX.Element[] = []
    for (let i = 1; i <= 6; i++) {
        const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe]
        const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe]   
        if(ingredient && measure){
          ingredients.push(
            <li key={i} className='text-lg font-normal'>{ingredient} - {measure}</li>
          )
        }
      }
      return ingredients
  }

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                  <DialogTitle as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                      {selectedRecipe.strDrink}
                  </DialogTitle>

                  <img 
                    src={selectedRecipe.strDrinkThumb} 
                    alt={`Imagen de ${selectedRecipe.strDrinkThumb}`} 
                    className='mx-auto w-96'
                  />

                  <DialogTitle as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    Ingredientes y Cantidades
                  </DialogTitle>
                  <ul>
                    {renderIngredients()}
                  </ul>
                  <DialogTitle as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    Instrucciones
                  </DialogTitle>

                  <p>{selectedRecipe.strInstructions}</p>

                  <div className='mt-5 flex gap-4'>

                    <button
                      type='button'
                      className='p-3 bg-gray-600 hover:bg-gray-700 cursor-pointer text-white rounded w-full uppercase'
                      onClick={closeModal}
                    >cerrar</button>

                    <button
                      type='button'
                      className='p-3 bg-orange-600 hover:bg-orange-700 cursor-pointer text-white rounded w-full uppercase'
                      onClick={() => handleClickFavorite(selectedRecipe)}
                    >{favoriteExists(selectedRecipe.idDrink) ? 'eliminar de' : 'agregar a'} favoritos</button>

                  </div>

                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}