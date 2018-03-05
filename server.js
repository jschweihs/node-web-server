// Requires
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// Get port from system environment variables
const port = process.env.PORT || 3000;

// Setup express
var app = express();

// Setup handlebars and partials
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


// Middleware example that logs request information
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  });
  next(); // Script is frozen until this is called
});

// Maintainence portion
// app.use((req, res, next) => {
//   res.render('maintainence.hbs');
// });

// Establish directory after maintainence
app.use(express.static(__dirname + '/public'));

// Examples of helper functions
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// Home page handler
app.get('/', (req, res) => {
    // res.send('<h1>hello express</h1>');
    res.render('home.hbs' , {
      pageTitle: 'Home Page',
      welcomeMessage: 'Welcome to the home page!'
    });
});

// About Page handler
app.get('/about', (req, res) => {
  // res.send('<h1>About</h1>');
  res.render('about.hbs' , {
    pageTitle: 'About Page'
  });
})

// Bad page, JSON example
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'You gone and done it.'
  });
});

// Establish port
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
