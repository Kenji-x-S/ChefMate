import React, { useEffect, useState } from 'react'
//import food from '../assets/food.jpeg'
import RecipeItems from '../components/RecipeItems.jsx'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal.jsx'
import InputForm from '../components/inputForm.jsx'

export default function Home(){
    const navigate=useNavigate()
    const [isOpen,setIsOpen]=useState(false)
    const addRecipe=()=>{
        let token=localStorage.getItem("token")
        if(token){
        navigate("/addRecipe")
        }
        else{
            setIsOpen(true)
        }
    }
  return(
    <>
        <section className='home'>
            <div className='left'>
                <h1>Welcome to CHEFMATE</h1>
                <h5>Your AI-powered cooking companion that transforms your kitchen into a culinary playground. Discover recipes, plan meals, and embark on delicious adventures with the power of artificial intelligence.</h5>
                <button onClick={addRecipe}>Share your recipes</button>
            </div>
            { (isOpen) && <Modal onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>}
            <div className='recipe'>
                <RecipeItems/>
            </div>
        </section>
    </>
  )
}