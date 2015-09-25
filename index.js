var express = require('express');
var app = express();

app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var handlebars = require('express-handlebars');

app.set("views", __dirname + "/views/");

app.engine('.hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'default'
}));

app.set('view engine', '.hbs');


app.get('/', function(req, res) {
  res.send('家計簿');
});

app.listen(3000);
