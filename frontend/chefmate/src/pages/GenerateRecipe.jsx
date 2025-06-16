import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/GenerateRecipe.css';

const GenerateRecipe = () => {
    const [formData, setFormData] = useState({
        ingredients: '',
        dietaryPreferences: '',
        mealType: '',
        cookingTime: ''
    });
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const generateRecipe = async (prompt) => {
        try {
            const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-lite-001:generateContent?key=AIzaSyDIswmKQZhbXx-BZckdfYG4mBGwIwlYDhk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API Error:', errorData);
                throw new Error(errorData.error?.message || 'Failed to generate recipe');
            }

            const data = await response.json();
            if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
                throw new Error('Invalid response format from API');
            }
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const prompt = `Generate a detailed recipe with the following specifications:
            Available Ingredients: ${formData.ingredients}
            Dietary Preferences: ${formData.dietaryPreferences}
            Meal Type: ${formData.mealType}
            Maximum Cooking Time: ${formData.cookingTime} minutes

            Please provide the response in the following format:
            Title: [Recipe Name]
            
            Ingredients:
            [List all ingredients with quantities]
            
            Instructions:
            [Step by step instructions]
            
            Cooking Time: [Total time]
            
            Nutritional Information:
            [Calories, protein, carbs, fat, etc.]
            
            Additional Notes:
            [Any tips, serving suggestions, or variations]`;

            const generatedRecipe = await generateRecipe(prompt);
            setRecipe(generatedRecipe);
        } catch (err) {
            console.error('Error details:', err);
            setError('Failed to generate recipe. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const formatRecipe = (recipeText) => {
        const sections = recipeText.split('\n\n');
        return sections.map((section, index) => {
            if (section.startsWith('Title:')) {
                return (
                    <motion.h1
                        key={index}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="recipe-title"
                    >
                        {section.replace('Title:', '').trim()}
                    </motion.h1>
                );
            }
            if (section.startsWith('Ingredients:')) {
                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="recipe-section"
                    >
                        <h2>Ingredients</h2>
                        <ul>
                            {section
                                .replace('Ingredients:', '')
                                .trim()
                                .split('\n')
                                .map((item, i) => (
                                    <li key={i}>{item.trim()}</li>
                                ))}
                        </ul>
                    </motion.div>
                );
            }
            if (section.startsWith('Instructions:')) {
                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="recipe-section"
                    >
                        <h2>Instructions</h2>
                        <ol>
                            {section
                                .replace('Instructions:', '')
                                .trim()
                                .split('\n')
                                .map((step, i) => (
                                    <li key={i}>{step.trim()}</li>
                                ))}
                        </ol>
                    </motion.div>
                );
            }
            return (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="recipe-section"
                >
                    <h2>{section.split(':')[0]}</h2>
                    <p>{section.split(':')[1]?.trim()}</p>
                </motion.div>
            );
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="generate-recipe-container"
        >
            <h1>Generate Your Perfect Recipe</h1>
            <form onSubmit={handleSubmit} className="recipe-form">
                <div className="form-group">
                    <label>Available Ingredients (comma-separated)</label>
                    <input
                        type="text"
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                        required
                        placeholder="e.g., chicken, rice, tomatoes"
                    />
                </div>
                <div className="form-group">
                    <label>Dietary Preferences</label>
                    <input
                        type="text"
                        name="dietaryPreferences"
                        value={formData.dietaryPreferences}
                        onChange={handleChange}
                        required
                        placeholder="e.g., vegetarian, gluten-free"
                    />
                </div>
                <div className="form-group">
                    <label>Meal Type</label>
                    <select
                        name="mealType"
                        value={formData.mealType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a meal type</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="snack">Snack</option>
                        <option value="dessert">Dessert</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Maximum Cooking Time (minutes)</label>
                    <input
                        type="number"
                        name="cookingTime"
                        value={formData.cookingTime}
                        onChange={handleChange}
                        required
                        min="1"
                        placeholder="e.g., 30"
                    />
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Generating...' : 'Generate Recipe'}
                </motion.button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {recipe && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="recipe-result"
                >
                    {formatRecipe(recipe)}
                </motion.div>
            )}
        </motion.div>
    );
};

export default GenerateRecipe; 