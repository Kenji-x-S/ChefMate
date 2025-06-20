import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import InputForm from './inputForm'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { FaSun, FaMoon } from 'react-icons/fa'

export default function Navbar(){
  const [isOpen,setIsOpen]=useState(false)
  let token=localStorage.getItem("token")
  const [isLogin,setIsLogin]=useState(token?false:true)
  const { isDarkMode, toggleTheme } = useTheme()

  useEffect(()=>{
    setIsLogin(token ? false :true)
  },[token])

  const checkLogin=()=>{
    if(token){
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setIsLogin(true)
    }
    else{
      setIsOpen(true)
    }
  }

  return(
    <>
    <header className="navbar-custom bg-orange-50/80 backdrop-blur-lg py-3 px-6 flex justify-between items-center fixed top-0 w-full z-50">
        <h2 className="logo-custom text-3xl font-extrabold text-white drop-shadow-md">CHEFMATE</h2>
        <ul className="nav-list flex space-x-4 items-center">
            <li><NavLink to="/" className={({ isActive }) => { console.log('Home isActive:', isActive); return `nav-item text-white ${isActive ? 'underline decoration-orange-400/50 font-bold' : 'hover:text-orange-300 hover:shadow-[0_0_10px_rgba(255,165,0,0.3)]'} transition-all duration-500 ease-in-out` }}>Home</NavLink></li>
            <li onClick={()=> isLogin && setIsOpen(true)}><NavLink to={!isLogin? "/myRecipe" : "/"} className={({ isActive }) => { console.log('My Recipes isActive:', isActive); return `nav-item text-white ${isActive ? 'underline decoration-orange-400/50 font-bold' : 'hover:text-orange-300 hover:shadow-[0_0_10px_rgba(255,165,0,0.3)]'} transition-all duration-500 ease-in-out` }}>My Recipes</NavLink></li>
            <li onClick={()=> isLogin && setIsOpen(true)}><NavLink to={!isLogin? "/favRecipe" : "/"} className={({ isActive }) => { console.log('Favourites isActive:', isActive); return `nav-item text-white ${isActive ? 'underline decoration-orange-400/50 font-bold' : 'hover:text-orange-300 hover:shadow-[0_0_10px_rgba(255,165,0,0.3)]'} transition-all duration-500 ease-in-out` }}>Favourites</NavLink></li>
            <li><NavLink to="/generate-recipe" className={({ isActive }) => { console.log('Generate Recipe isActive:', isActive); return `nav-item text-white ${isActive ? 'underline decoration-orange-400/50 font-bold' : 'hover:text-orange-300 hover:shadow-[0_0_10px_rgba(255,165,0,0.3)]'} transition-all duration-500 ease-in-out` }}>Generate Recipe</NavLink></li>
            <li onClick={checkLogin}>
              <NavLink to="/" className="action-btn text-white bg-amber-500 hover:bg-amber-600 px-5 py-2 rounded-lg transition-all duration-500 ease-in-out">
                {isLogin ? "Login" : "Logout"}
              </NavLink>
            </li>
            <li>
              <button 
                onClick={toggleTheme} 
                className="theme-toggle bg-transparent hover:bg-orange-200/50 text-white p-1.5 rounded-full transition-all duration-500 ease-in-out"
              >
                {isDarkMode ? (
                  <FaSun 
                    style={{ 
                      color: '#fff',
                      animation: 'rotate 1s ease-in-out'
                    }} 
                  />
                ) : (
                  <FaMoon 
                    style={{ 
                      color: '#fff',
                      animation: 'rotate 1s ease-in-out'
                    }} 
                  />
                )}
              </button>
            </li>
        </ul>
    </header>
    { (isOpen) && <Modal onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>}
    </>
  )
}