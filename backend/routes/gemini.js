const express = require('express');
const router = express.Router();
const { generateRecipe } = require('../controller/geminiController');

// Test route
router.get('/test', (req, res) => {
    console.log('Gemini test route hit');
    res.json({ message: 'Gemini route is working' });
});

// Debug middleware for generate-recipe route
router.use('/generate-recipe', (req, res, next) => {
    console.log('Generate recipe route hit');
    console.log('Request body:', req.body);
    next();
});

router.post('/generate-recipe', generateRecipe);

module.exports = router; 