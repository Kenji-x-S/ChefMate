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
    <header>
        <h2>CHEFMATE</h2>
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li onClick={()=> isLogin && setIsOpen(true)}><NavLink to={ !isLogin? "/myRecipe" : "/"}>My Recipes</NavLink></li>
            <li onClick={()=> isLogin && setIsOpen(true)}><NavLink to={!isLogin? "/favRecipe" : "/"}>Favourites</NavLink></li>
            <li onClick={checkLogin}>
              <NavLink to="/" className="login-btn">
                {isLogin ? "Login" : "Logout"}
              </NavLink>
            </li>
            <li>
              <button 
                onClick={toggleTheme} 
                className="theme-toggle"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.5s ease'
                }}
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