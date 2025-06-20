import React, { useState } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import Modal from '../components/Modal.jsx';
import InputForm from '../components/inputForm.jsx';
import RecipeItems from '../components/RecipeItems.jsx';
import { motion } from 'framer-motion';
import foodImage from '../assets/food.png';

export default function Home() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const recipes = useLoaderData();

  const addRecipe = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/addRecipe');
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-poppins text-gray-800 bg-cooking-tools-pattern bg-fixed">
      {/* Page Content */}
      <motion.section
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Hero Section */}
        <div className="py-16 px-6 md:px-12 flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-grow">
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold text-brand-orange mb-6"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Welcome to{' '}
              <motion.span
                className="inline-block"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                CHEFMATE
              </motion.span>
            </motion.h1>
            <p className="text-lg text-gray-600 mb-6">
              Your AI-powered cooking companion that transforms your kitchen into a culinary playground. Discover recipes, plan meals, and embark on delicious adventures with the power of artificial intelligence.
            </p>
            <button
              onClick={addRecipe}
              className="bg-brand-orange hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition duration-300 shadow-md hover:scale-105"
            >
              Share your recipes
            </button>
          </div>

          <motion.div
            className="flex-shrink-0 ml-12"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={foodImage}
              alt="Delicious food"
              className="rounded-3xl shadow-lg w-full max-w-[300px] h-auto object-contain"
            />
          </motion.div>
        </div>

        {/* Modal */}
        {isOpen && (
          <Modal onClose={() => setIsOpen(false)}>
            <InputForm setIsOpen={() => setIsOpen(false)} />
          </Modal>
        )}

        {/* Divider */}
        <div className="w-full h-[1px] bg-orange-200 my-10 mx-auto max-w-[80%]" />

        {/* Recipe Section */}
        <motion.div
          className="px-6 md:px-12 py-10"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-700 text-center mb-10 underline underline-offset-8 decoration-brand-orange">
            Featured Recipes
          </h2>

          {recipes.length === 0 ? (
            <p className="text-center text-gray-500">No recipes found.</p>
          ) : (
            <RecipeItems recipes={recipes} />
          )}
        </motion.div>
      </motion.section>
    </div>
  );
}