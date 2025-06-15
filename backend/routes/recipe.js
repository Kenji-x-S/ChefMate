const express=require("express")
const {getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload} = require("../controller/recipe")
const router=express.Router()

router.get("/",getRecipes) //get All recipes
router.get("/:id",getRecipe) //get recipe by id
router.post("/",upload.single('file'),addRecipe) //Add Recipe
router.put("/:id",editRecipe) //Edit Recipe
router.delete("/:id",deleteRecipe) //Delete Recipe

module.exports=router