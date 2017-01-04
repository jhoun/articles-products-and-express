const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const app = express();
const products = require('./routes/products');

app.use('/products', products);

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
}))

app.set('view engine', '.hbs');


if(!module.parent){
    app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
}

module.exports = app;