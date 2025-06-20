import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsStopwatchFill } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';

export default function RecipeItems({ recipes }) {
  const [allRecipes, setAllRecipes] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const isMyRecipePage = location.pathname === '/myRecipe';

  let favItems = JSON.parse(localStorage.getItem('fav')) ?? [];
  const [isFavRecipe, setIsFavRecipe] = useState(false);

  useEffect(() => {
    setAllRecipes(recipes);
  }, [recipes]);

  const onDelete = async (id) => {
    await axios.delete(`http://localhost:5000/recipe/${id}`);
    setAllRecipes((prev) => prev.filter((r) => r._id !== id));
    const updatedFavs = favItems.filter((r) => r._id !== id);
    localStorage.setItem('fav', JSON.stringify(updatedFavs));
  };

  const favRecipe = (item) => {
    const isAlreadyFav = favItems.some((r) => r._id === item._id);
    const updatedFavs = isAlreadyFav
      ? favItems.filter((r) => r._id !== item._id)
      : [...favItems, item];
    localStorage.setItem('fav', JSON.stringify(updatedFavs));
    setIsFavRecipe((prev) => !prev);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center">
      {allRecipes?.map((item) => (
        <div
          key={item._id}
          className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl shadow-md p-5 w-full max-w-xs cursor-pointer transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,165,0,0.3)] hover:bg-orange-50/20 hover:scale-105"
          onDoubleClick={() => navigate(`/recipe/${item._id}`)}
        >
          <img
            src={`http://localhost:5000/images/${item.coverImage}`}
            alt={item.title}
            className="w-full h-40 object-cover rounded-xl mb-4 shadow-md"
          />

          <div className="text-xl font-bold text-gray-800 mb-2">{item.title}</div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-2 text-orange-600 font-medium">
              <BsStopwatchFill /> {item.time}
            </div>

            {!isMyRecipePage ? (
              <FaHeart
                onClick={() => favRecipe(item)}
                className={`cursor-pointer text-lg transition ${
                  favItems.some((r) => r._id === item._id)
                    ? 'text-red-500 scale-110'
                    : 'hover:text-red-400'
                }`}
              />
            ) : (
              <div className="flex gap-3 text-lg">
                <Link to={`/editRecipe/${item._id}`} className="text-blue-600 hover:scale-110">
                  <FaEdit />
                </Link>
                <MdDelete
                  onClick={() => onDelete(item._id)}
                  className="text-red-600 hover:scale-110 cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}