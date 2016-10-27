var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');

var app = express();
var db;

//Set Up HandleBars System
var hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//app.use('/api/users', require('./controllers/api/users.controller'));
app.use(express.static('static'));

var cockTailData = [
    {id: 1, cocktailName: 'Old Fashion', text:'This is a whiskey drink'},
    {id: 2, cocktailName: 'White Russian', text:'This is a gross Vodka and Coffee drink'}
];

app.post('/api/cocktail_search', function(req, res) {
    var postIngredients = req.body.ingredients;

    db.collection("cocktails").find( { ingredients: {$all: postIngredients }} ).toArray(function(err, docs) {
        res.json(docs);
    });
});

app.get('/api/ingredients', function(req, res) {
    //res.status(200).send(JSON.stringify(cockTailData));
    db.collection("ingredients").find().toArray(function(err, docs) {
        res.json(docs);
    });
});

app.get('/cocktail/:id', function(req, res) {
    var mongo = require('mongodb');
    var cocktailId = new mongo.ObjectID(req.params.id);

    var cocktail = db.collection("cocktails").findOne( { _id: cocktailId }, function(err, cocktail) {
        var ingredientIndx = 0;
        var ingredientWithMeasurements = [];

        //Build Ingredients List
        while(ingredientIndx < 12) {
            if (typeof cocktail.ingredients[ingredientIndx] !== 'undefined') {
                ingredientWithMeasurements.push(cocktail.ingredientMeasurements[ingredientIndx]+" "+cocktail.ingredients[ingredientIndx]);
            }
            ingredientIndx++;
        }

        //Get Search Image

        if (cocktail.has_image) {
            var imgUrl = "https://s3-us-west-2.amazonaws.com/image.dreamycocktails.com/"+cocktail._id+".jpg";
        }
        else {
            var imgUrl = "https://s3-us-west-2.amazonaws.com/image.dreamycocktails.com/default_cocktail.jpg";
        }

        res.render('cocktail', {
            cocktailName: cocktail.cocktail_name,
            ingredients: ingredientWithMeasurements,
            glass: cocktail.glass,
            instructions: cocktail.instructions,
            imgUrl: imgUrl
        });
    });
    // var test = 34;



});

MongoClient.connect('mongodb://localhost/cocktail_database', function(err, dbConnection) {
    db = dbConnection;
    var server = app.listen(3000, function() {
        var port = server.address().port;
        console.log("Started server at port", port);
    });
});