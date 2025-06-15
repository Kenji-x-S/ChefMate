import React, { useState } from 'react'
import Modal from './Modal'
import InputForm from './inputForm'

export default function Navbar(){
  const [isOpen,setIsOpen]=useState(false)

  const checkLogin=()=>{
    setIsOpen(true)
  }

  return(
    <>
    <header>
        <h2>CHEFMATE</h2>
        <ul>
            <li>Home</li>
            <li>My Recipes</li>
            <li>Favourites</li>
            <li onClick={checkLogin}>Login</li>
        </ul>
    </header>
  { (isOpen) && <Modal onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>}
    </>
  )
}