const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the Gemini API with the API key
const genAI = new GoogleGenerativeAI('AIzaSyDIswmKQZhbXx-BZckdfYG4mBGwIwlYDhk');

const generateRecipe = async (req, res) => {
    try {
        const { ingredients, dietaryPreferences, mealType, cookingTime } = req.body;

        // Validate input
        if (!ingredients || !dietaryPreferences || !mealType || !cookingTime) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Initialize the model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Configure the generation parameters
        const generationConfig = {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
        };

        const prompt = `Generate a detailed recipe with the following specifications:
        Available Ingredients: ${ingredients}
        Dietary Preferences: ${dietaryPreferences}
        Meal Type: ${mealType}
        Maximum Cooking Time: ${cookingTime} minutes

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

        // Generate content with the configured parameters
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig,
        });

        const response = await result.response;
        const text = response.text();

        if (!text) {
            throw new Error('No response from Gemini API');
        }

        res.json({ recipe: text });
    } catch (error) {
        console.error('Error generating recipe:', error);
        res.status(500).json({ 
            error: 'Failed to generate recipe',
            details: error.message || 'Unknown error occurred'
        });
    }
};

module.exports = {
    generateRecipe
}; 