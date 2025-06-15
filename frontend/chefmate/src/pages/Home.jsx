import React from 'react'
import food from '../assets/food.jpeg'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import RecipeItems from '../components/RecipeItems.jsx'

export default function Home(){
  return(
    <>
        <section className='home'>
            <div className='left'>
                <h1>Food Recipe</h1>
                <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi itaque atque ipsa consectetur quod consequatur id esse cum molestias harum illum accusamus labore inventore autem, obcaecati perferendis ipsam eligendi ab!
                Eligendi praesentium explicabo aspernatur consequuntur soluta facere at delectus, similique aliquid tempore mollitia illum. Maxime a quo perspiciatis sint consequatur totam! Hic eum voluptatum perspiciatis, totam consequuntur ea ipsum iste?
                Adipisci error consequuntur illo cupiditate? Quia nulla, amet, placeat molestias dolor debitis voluptatum aspernatur necessitatibus inventore quasi omnis dolores harum nemo quam doloremque? Consectetur nobis, molestias quis rerum harum est.</h5>
                <button>Share your recipes</button>
            </div>
            <div className='right'>
                <img src={food} width="300px" height="300px" ></img>
            </div>
            <div className='bg'>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#00cba9" fillOpacity="1" d="M0,96L80,80C160,64,320,32,480,58.7C640,85,800,171,960,202.7C1120,235,1280,213,1360,202.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
            </div>
            <div className='recipe'>
                <RecipeItems/>
            </div>
        </section>
    </>
  )
}