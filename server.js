const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
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

app.use('/products', products);

app.use('/articles', articles);



if(!module.parent){
    app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
}

module.exports = app;