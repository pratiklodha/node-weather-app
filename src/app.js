// terminal execution : nodemon src/app.js -e js,hbs

// Require geocode and forecast in app.js
const geoCode = require('./utils/geocode');
const foreCast = require('./utils/forecast');

const path = require('path');
const express = require('express');
const hbs = require('hbs'); //handlebars

const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Pratik'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Pratik'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Pratik'
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Pratik',
        errorMessage: 'Help article not found'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        }

        foreCast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
});


app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Pratik',
        errorMessage: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on the port 3000');
});