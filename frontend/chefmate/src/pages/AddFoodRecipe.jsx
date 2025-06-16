import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddFoodRecipe() {
    const [recipeData, setRecipeData] = useState({
        title: '',
        time: '',
        ingredients: '',
        instructions: '',
        file: null
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const navigate = useNavigate()

    const onHandleChange = (e) => {
        const { name, value, files } = e.target
        if (name === "ingredients") {
            setRecipeData(prev => ({ ...prev, [name]: value.split(",").map(item => item.trim()) }))
        } else if (name === "file") {
            const file = files[0]
            setRecipeData(prev => ({ ...prev, [name]: file }))
            if (file) {
                const reader = new FileReader()
                reader.onloadend = () => {
                    setPreviewImage(reader.result)
                }
                reader.readAsDataURL(file)
            }
        } else {
            setRecipeData(prev => ({ ...prev, [name]: value }))
        }
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const formData = new FormData()
            Object.keys(recipeData).forEach(key => {
                if (key === 'ingredients') {
                    formData.append(key, JSON.stringify(recipeData[key]))
                } else {
                    formData.append(key, recipeData[key])
                }
            })

            const token = localStorage.getItem("token")
            if (!token) {
                throw new Error('Please login to add a recipe')
            }

            await axios.post("http://localhost:5000/recipe", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': 'bearer ' + token
                }
            })

            navigate("/")
        } catch (err) {
            console.error('Error adding recipe:', err)
            setError(err.response?.data?.message || err.message || 'Failed to add recipe')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="add-recipe-page">
            <div className="add-recipe-container">
                <form className="add-recipe-form" onSubmit={onHandleSubmit}>
                    <h2>Share Your Recipe</h2>
                    {error && <div className="error-message">{error}</div>}
                    
                    <div className="form-group">
                        <label htmlFor="title">Recipe Title</label>
                        <input 
                            type="text" 
                            id="title"
                            name="title" 
                            value={recipeData.title}
                            onChange={onHandleChange}
                            required
                            placeholder="Enter a catchy title for your recipe"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="time">Cooking Time (minutes)</label>
                        <input 
                            type="number" 
                            id="time"
                            name="time" 
                            value={recipeData.time}
                            onChange={onHandleChange}
                            required
                            min="1"
                            placeholder="How long does it take to cook?"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="ingredients">Ingredients</label>
                        <textarea 
                            id="ingredients"
                            name="ingredients" 
                            value={recipeData.ingredients}
                            onChange={onHandleChange}
                            required
                            placeholder="List ingredients separated by commas (e.g., 2 cups flour, 1 tsp salt)"
                            rows="4"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="instructions">Cooking Instructions</label>
                        <textarea 
                            id="instructions"
                            name="instructions" 
                            value={recipeData.instructions}
                            onChange={onHandleChange}
                            required
                            placeholder="Write step-by-step instructions for your recipe"
                            rows="6"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="file">Recipe Image</label>
                        <div className="file-upload-container">
                            <input 
                                type="file" 
                                id="file"
                                name="file" 
                                onChange={onHandleChange}
                                accept="image/*"
                                required
                            />
                            {previewImage && (
                                <div className="image-preview">
                                    <img src={previewImage} alt="Recipe preview" />
                                </div>
                            )}
                        </div>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Adding Recipe...' : 'Share Recipe'}
                    </button>
                </form>
            </div>
        </div>
    )
}