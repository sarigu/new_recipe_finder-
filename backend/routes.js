const router = require('express').Router();

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

//Run to load recipes in DB 

/*
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbObject = db.db("recipe-tinder");
    var recipes = [
        {
            title: 'Cabbage Dumplings',
            description: 'This is yummy',
            imagePath: '../../assets/dumplings.png',
            prepTime: 40,
            cookingTime: 10,
            serving: 4,
            ingredients: [
                { quantity: "300g", ingredient: "Plain rice flour" },
                { quantity: "100g", ingredient: "Daikon" },
                { quantity: "800ml", ingredient: "Water" },
                { quantity: "500g", ingredient: "Cabbage" }
            ],
            vegan: false,
            vegetarian: true,
            treat: false,
            meal: true
        },
        {
            title: 'Spicy Tuna Pizza',
            description: 'This is yummy',
            imagePath: '../../assets/pizza.png',
            prepTime: 40,
            cookingTime: 20,
            serving: 4,
            ingredients: [
                { quantity: "300g", ingredient: "Flour" },
                { quantity: "10ml", ingredient: "Oil" },
                { quantity: "2 Tbsp", ingredient: "Siracha" },
                { quantity: "1 Tsp", ingredient: "Salt" },
                { quantity: "1 Can", ingredient: "Tuna" }
            ],
            vegan: false,
            vegetarian: false,
            treat: false,
            meal: true
        },
        {
            title: 'Salad Pork Rolls',
            description: 'This is yummy',
            imagePath: '../../assets/rolls.png',
            prepTime: 40,
            cookingTime: 20,
            serving: 4,
            ingredients: [
                { quantity: "1 whole", ingredient: "Salad" },
                { quantity: "500g", ingredient: "Prok Belly" },
                { quantity: "2 Tbsp", ingredient: "Oil" },
                { quantity: "1 Tsp", ingredient: "Salt" },
            ],
            vegan: false,
            vegetarian: false,
            treat: false,
            meal: true
        }
    ];
    dbObject.collection("meals").insertMany(recipes, function (err, res) {
        if (err) throw err;
        console.log("Number of Recipes inserted: " + res.insertedCount);
        db.close();
    });
});

// SWEETS

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbObject = db.db("recipe-tinder");
    var recipes = [
        {
            title: 'Sponge Cake',
            description: 'This is yummy',
            imagePath: '../../assets/dumplings.png',
            prepTime: 40,
            cookingTime: 10,
            serving: 4,
            ingredients: [
                { quantity: "300g", ingredient: "Plain rice flour" },
                { quantity: "100ml", ingredient: "Oil" },
                { quantity: "800ml", ingredient: "Water" },
                { quantity: "500g", ingredient: "Sugar" }
            ],
            vegan: false,
            vegetarian: true,
            treat: true,
            meal: false
        },
        {
            title: 'Strawberry Cake',
            description: 'This is yummy',
            imagePath: '../../assets/pizza.png',
            prepTime: 40,
            cookingTime: 20,
            serving: 4,
            ingredients: [
                { quantity: "300g", ingredient: "Flour" },
                { quantity: "200g", ingredient: "Butter" },
                { quantity: "400g", ingredient: "Sugar" },
                { quantity: "2", ingredient: "Eggs" },
                { quantity: "500g", ingredient: "Strawberry" }
            ],
            vegan: false,
            vegetarian: false,
            treat: true,
            meal: false
        }
    ];
    dbObject.collection("sweets").insertMany(recipes, function (err, res) {
        if (err) throw err;
        console.log("Number of Recipes inserted: " + res.insertedCount);
        db.close();
    });
});

*/

const recipeQuery = async (collectionName) => {
    const db = await MongoClient.connect(url);
    const dbo = db.db("recipe-tinder");
    const result = await dbo.collection(collectionName).find().limit(15).toArray()
    return result;

}


router.get('/meals/recipes', async (request, response) => {
    try {
        const res = await recipeQuery("meals");
        console.log("FROM DB", res);
        return response.send(res)
    } catch (error) {
        console.log("ERR", error);
        return response.status(400).send('Bad request')
    }
});


router.get('/sweets/recipes', async (request, response) => {
    try {
        const res = await recipeQuery("sweets");
        console.log("FROM DB", res);
        return response.send(res)
    } catch (error) {
        console.log("ERR", error);
        return response.status(400).send('Bad request')
    }
});


const insertRecipe = async (collectionName, recipe) => {
    const db = await MongoClient.connect(url);
    const dbo = db.db("recipe-tinder");
    const result = await dbo.collection(collectionName).insertOne(recipe);
    return result;
}


router.post('/meals/recipe', async (request, response) => {
    console.log("REQ", request.body)
    try {
        const res = await insertRecipe("sweets", request.body);
        console.log("FROM DB", res);
        return response.status(200).send('Ok')
    } catch (error) {
        console.log("ERR", error);
        return response.status(400).send('Bad request')
    }
});

router.post('/sweets/recipe', async (request, response) => {
    console.log("REQ", request.body)
    try {
        const res = await insertRecipe("meals", request.body);
        console.log("FROM DB", res);
        return response.status(200).send('Ok')
    } catch (error) {
        console.log("ERR", error);
        return response.status(400).send('Bad request')
    }
});



module.exports = router;