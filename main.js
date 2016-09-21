var express = require('express')
var MongoClient = require('mongodb').MongoClient;

var app = express();
var db;

//app.use('/api/users', require('./controllers/api/users.controller'));
app.use(express.static('static'));

var cockTailData = [
    {id: 1, cocktailName: 'Old Fashion', text:'This is a whiskey drink'},
    {id: 2, cocktailName: 'White Russian', text:'This is a gross Vodka and Coffee drink'}
];

app.get('/api/cocktails', function(req, res) {
    //res.status(200).send(JSON.stringify(cockTailData));
    db.collection("cocktails").find().toArray(function(err, docs) {
        res.json(docs);
    });
});


MongoClient.connect('mongodb://localhost/cocktail_database', function(err, dbConnection) {
    db = dbConnection;
    var server = app.listen(3000, function() {
        var port = server.address().port;
        console.log("Started server at port", port);
    });
});