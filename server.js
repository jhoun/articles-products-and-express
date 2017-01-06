const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const app = express();
const products = require('./routes/products');
const articles = require('./routes/articles');



app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
}))

app.set('view engine', '.hbs');

app.use(bodyParser.urlencoded({
  extended:true
}));

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.use('/products', products);

app.use('/articles', articles);


if(!module.parent){
    app.listen(8080, () => {
    console.log('Server started on port 8080');
  });
}

module.exports = app;