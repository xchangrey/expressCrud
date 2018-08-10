var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var port = 3000;

var ingredients = [
  {
    "id": "232kAk",
    "text":"eggs"
  },
  {
    "id": "245kAk",
    "text": "Milk"
  },
  {
    "id": "23rGt",
    "text": "Bacon"
  },
  {
    "id": "3456fA",
    "text": "Bread"
  }
];

app.get('/ingredients', function(req, res){
  res.send(ingredients);
});

app.post('/ingredients', function(req, res){
  var ingredient = req.body;
  if(!ingredient || ingredient.text == "") {
    res.status(500).send({error: `Your ingredient must have text`})
  } else {
    ingredients.push(ingredient);
    res.status(200).send(ingredients);
  }
});

app.put('/ingredients/:ingredientId', function(req, res){
  var newText = req.body.text;
  if(!newText || newText === ""){
    res.status(500).send({error: `You must provide ingredient text`})
  } else {
    var objectFound = false;
    for (var i = 0; ingredients.length; i++) {
        var ing = ingredients[i];
        if(ing.id === req.params.ingredientId){
          ing.text = newText;
          objectFound = true;
          break;
        }
    }
    if(!objectFound){
      res.status(200).send({error:`Ingredient id not found`})
    } else {
      res.status(200).send(ingredients);
    }
  }

});

app.delete('/ingredients/:ingredientId', function(req, res){
  var objectFound = false;
  for(var i=0; ingredients.length; i++){
    var ing = ingredients[i];
    if(ing.id === req.params.ingredientId){
      ingredients.splice(ing, 1);
      objectFound = true;
      break;
    }
  }
  !objectFound ? res.status(500).send({error: `Ingredient id not found`}) : res.status(200).send(ingredients);
});

app.listen(port, function(){
  console.log(`Server is running on port ${port}`)
});



