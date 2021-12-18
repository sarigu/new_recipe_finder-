const router = require('express').Router();

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

const QUERY_LIMIT = 2;

//http://localhost:8000/meals/recipes?page=1

// ----  DELETE COLLECTION ---- 
/*
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("recipe-tinder");
    dbo.collection("sweets").drop(function (err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
        db.close();
    });
});

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("recipe-tinder");
    dbo.collection("meals").drop(function (err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
        db.close();
    });
});
*/

//  ----  LOAD COLLECTIONS ---- 
/*
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbObject = db.db("recipe-tinder");
    var recipes = [
        {
            title: 'Cabbage Dumplings',
            description: 'This is yummy',
            emojiUnicodes: ['0x1f95c;', '0x1f96c;'],
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
            emojiUnicodes: ['0x1f363;', '0x1f355;'],
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
            emojiUnicodes: ['0x1f96c;', '0x1f969;'],
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
        },
        {
            title: 'Cheese Sandwich',
            description: 'This is yummy',
            emojiUnicodes: ['0x1f35e;', '0x1f9c0;', '0x1f96a;'],
            prepTime: 40,
            cookingTime: 20,
            serving: 4,
            ingredients: [
                { quantity: "1 whole", ingredient: "Bread" },
                { quantity: "500g", ingredient: "Cheese" },
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
            emojiUnicodes: ['0x1f370;'],
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
            emojiUnicodes: ['0x1f370;', '0x1f353;'],
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
        },
         {
            title: 'Peach Pie',
            description: 'This is yummy',
            emojiUnicodes: ['0x1f351;', '0x1f965;', '0x1f330;'],
            prepTime: 40,
            cookingTime: 20,
            serving: 4,
            ingredients: [
                { quantity: "300g", ingredient: "Flour" },
                { quantity: "200g", ingredient: "Butter" },
                { quantity: "400g", ingredient: "Sugar" },
                { quantity: "2", ingredient: "Eggs" },
                { quantity: "500g", ingredient: "Peaches" }
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

const recipeQuery = async (collectionName, skipIndex) => {
    const db = await MongoClient.connect(url);
    const dbo = db.db("recipe-tinder");
    const result = await dbo.collection(collectionName).find().limit(QUERY_LIMIT).skip(skipIndex).toArray()
    console.log("RES", result);
    return result;

}


router.get('/meals/recipes', async (request, response) => {
    try {
        const page = parseInt(request.query.page);
        console.log("PAGE", page);
        console.log("LIMIT", QUERY_LIMIT);
        const skipIndex = (page - 1) * QUERY_LIMIT;
        console.log("SKIP", skipIndex);
        const result = await recipeQuery("meals", skipIndex);
        console.log("FROM DB", result);
        return response.send(result)
    } catch (error) {
        console.log("ERR", error);
        return response.status(400).send('Bad request')
    }
});


router.get('/sweets/recipes', async (request, response) => {
    try {
        const page = parseInt(request.query.page);
        console.log("PAGE", page);
        console.log("LIMIT", QUERY_LIMIT);
        const skipIndex = (page - 1) * QUERY_LIMIT;
        console.log("SKIP", skipIndex);
        const result = await recipeQuery("sweets", skipIndex);
        console.log("FROM DB", result);
        return response.send(result)
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
        const result = await insertRecipe("meals", request.body);
        console.log("FROM DB", result);
        return response.status(200).send('Ok')
    } catch (error) {
        console.log("ERR", error);
        return response.status(400).send('Bad request')
    }
});

router.post('/sweets/recipe', async (request, response) => {
    console.log("REQ", request.body)
    try {
        const result = await insertRecipe("sweets", request.body);
        console.log("FROM DB", result);
        return response.status(200).send('Ok')
    } catch (error) {
        console.log("ERR", error);
        return response.status(400).send('Bad request')
    }
});



module.exports = router;