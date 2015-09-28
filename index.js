var express = require('express');
var app = express();

app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var handlebars = require('express-handlebars');

app.set("views", __dirname + "/src/public/views/");

app.engine('.hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'default'
}));

app.set('view engine', '.hbs');

var models = require('./src/models/model');
var routes = require('./src/routes/routes');

routes(app, models);

app.listen(3000);
