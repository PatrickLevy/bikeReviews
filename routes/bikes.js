var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/bikes');

//List bikes for main page
router.get('/', function(req, res) {
    var collection = db.get('bikes');
    collection.find({}, function(err, bikes){
        if (err) throw err;
      	res.json(bikes);
    });
});

//POST a new bike to database
router.post('/', function(req, res){
    var collection = db.get('bikes');
    collection.insert({
    	reviewerName: req.body.reviewerName,
        brand: req.body.brand,
        type: req.body.type,
        year: req.body.year,
        model: req.body.model,
        review: req.body.review,
        value: req.body.value,
        favorite: req.body.favorite,
        rating: req.body.rating

    }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});

//get information about a bike review
router.get('/:id', function(req, res) {
    var collection = db.get('bikes');
    collection.findOne({ _id: req.params.id }, function(err, bike){
        if (err) throw err;

      	res.json(bike);
    });
});

//update the information about a bike review
router.put('/:id', function(req, res){
    var collection = db.get('bikes');
    collection.update({
        _id: req.params.id
    },
    {
        reviewerName: req.body.reviewerName,
        brand: req.body.brand,
        type: req.body.type,
        year: req.body.year,
        model: req.body.model,
        review: req.body.review,
        value: req.body.value,
        favorite: req.body.favorite,
        rating: req.body.rating
    }, function(err, bike){
        if (err) throw err;

        res.json(bike);
    });
});

//delete a bike review
router.delete('/:id', function(req, res){
    var collection = db.get('bikes');
    collection.remove({ _id: req.params.id }, function(err, bike){
        if (err) throw err;

        res.json(bike);
    });
});

module.exports = router;
