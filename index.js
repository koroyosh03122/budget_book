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


// app.get('/', function(req, res) {
//   res.send('家計簿');
// });

var models = require('./src/models/models');
var routes = require('./src/routes/routes');

// console.log(routes);
routes(app, models);
//
// app.param('table', function(req, res, next, table){
//   if (!models[table]) {
//     return res.status(404).json({
//       status: 404,
//       message: "Model not found."
//     });
//   } else {
//     next();
//   }
// });
//
//
app.listen(3000);
