const stockfinder = require('stockfinder');
const express = require('express'); // Allows the usage of express in the application
const server = express(); // This command creates the express server we will be using
const PORT = 1337; // This specifies to the server the port that it should run the server on 
const API_KEY = `pk_16a849fd637243a79fff90fa4d42bc5d`

// This is loading the handlebars module
const handlebars = require('express-handlebars')

// This tells our application to use the handleebars engine instead of the ejs we used 
server.set('view engine', 'handlebars')

///////////////////////////////

server.engine('handlebars', handlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'backup',
    partialsDir: __dirname + '/views/partials/'
}));


// // Apparently this is for importing the css file
server.use(express.static('public'))

//////////////////////////////


// This render the home page when request is made to the root/home page, 
server.get('/', (req, res) => { // take the res (response)
    res.render('main', {layout: 'index'}); // it will render the layout named index //////////////// Also if you do not specify a defaultLayout 
});

server.get('/info', (req, res) => {
    stockfinder.getStock({
        ticker: req.query.symbol,
        apiKey: API_KEY
    }).then((result) => {
    res.render('main', {layout: 'info', price: result.previousClose, symbol: req.query.symbol});
    });
});

server.listen(PORT, () => console.log(`Serving on port ${PORT}`))

