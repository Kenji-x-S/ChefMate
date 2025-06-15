import React from 'react'
import './App.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import axios from 'axios'

const getAllRecipes=async()=>{
  let allRecipes=[]
  await axios.get('http://localhost:5000/recipe').then(res=>{
    allRecipes=res.data
  })
  return allRecipes
}

const router=createBrowserRouter([
  {path:"/",element:<MainNavigation/>,children:[
  {path:"/",element:<Home/>, loader:getAllRecipes}
  ]}
]
)
useEffect(() => {
  const handleScroll = () => {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.classList.add("blur-header");
    } else {
      header.classList.remove("blur-header");
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

export default function App(){
  return(
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}