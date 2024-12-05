import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layouts/Layout"

//import IndexPage from "./views/IndexPage"
const IndexPage = lazy(() => import("./views/IndexPage"))
//import FavoritePage from "./views/FavoritePage"
const FavoritePage = lazy(() => import("./views/FavoritePage"))

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          
          <Route  path="/" element={ 
            <Suspense fallback="cargando ...">
              <IndexPage /> 
            </Suspense>
            } index />
          
          <Route  path="/favorites" element={ 
            <Suspense fallback="cargando ...">
              <FavoritePage /> 
            </Suspense>
            } />
        
        </Route> 
      </Routes>
    </BrowserRouter>
  )
}

