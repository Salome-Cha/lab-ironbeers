const express = require('express');
const app = express();


const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const punkAPI = new PunkAPIWrapper();

app.use(express.static('public')); 
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => res.render('beers', {beers: beersFromApi}
  ))
  .catch(error => console.log(error));
  ;
});


app.get('/randombeers', (req, res) => {
  punkAPI
  .getRandom()
  .then((randomBeer) => res.render('randombeers', {randomBeer}
  ))
  .catch(error => console.log(error));
  });


  app.get('/beers/:id', (req, res) => {
    let id = req.params.id

    punkAPI
    .getBeer(id)
    .then((oneBeer) => 
    {console.log(oneBeer)
      let thatBeer = oneBeer[0]
      res.render('specificbeer', thatBeer)
      })
    .catch(error => console.log(error));
    });
  




app.listen(3000, () => console.log('🏃‍ on port 3000'));

