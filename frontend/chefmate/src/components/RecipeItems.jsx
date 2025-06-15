import React from 'react'
import { useLoaderData } from 'react-router-dom'
import burgerimg from '../assets/food.jpeg'
import {BsStopwatchFill} from "react-icons/bs";
import {FaHeart} from "react-icons/fa6";

export default function RecipeItems() {
    const allRecipes=useLoaderData()
    console.log(allRecipes)
    return(
        <div className='card-container'>
            {
                allRecipes?.map((item,index)=>{
                    return(
                        <div key={index} className='card'>
                            <img src={`http://localhost:5000/images/${item.coverImage}`} width="100px" height="100px"></img>
                            <div className='card-body'>
                                <div className='title'>{item.title}</div>
                                <div className='icons'>
                                    <div className='timer'><BsStopwatchFill/></div>
                                    <FaHeart/>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}