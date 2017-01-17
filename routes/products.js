const express = require('express');
const router = express.Router();
const Products = require('../db/product');


const isObjEmpty = (req, res, next) => {
  if(Object.keys(req.body).length === 0) {
    res.redirect('/products/new');
  } else {
    next()
  }
}

const isInputValid = (req, res, next) => {
  if(isNaN(Number(req.body.price)) || isNaN(Number(req.body.inventory))) {
    res.redirect('/products/new');
  } else {
    next()
  }
}

const idCheck = (req, res, next) => {
  if (Products.isIdFound(req.params.id) === false) {
    res.redirect(`/products/${req.params.id}/edit`);
  } else {
    next()
  }
}

const idCheckForDelete = (req, res, next) => {
  if (Products.isIdFound(req.params.id) === false) {
    res.redirect(`/products/${req.params.id}`);
  } else {
    next()
  }
}


router.route('/')
  .get((req, res) => {
    console.log('from route');
    Products.all()
    .then((products) => {
      console.log('/{products}: ', {products});
      res.render('index', {products});
    })
    .catch((e) =>{
      console.error(e);
      res.json(e);
    })
  })
  .post(isObjEmpty, isInputValid, (req,res) => {
    Products.add(req.body)
      .then((products)=>{
        console.log('products: ', products);
        res.redirect('/products');
      })
      .catch((e) =>{
        console.error(e);
        res.json(e);
      })
  })

router.route('/new')
  .get((req,res) => {
    res.render('new');
  })

router.route('/:id')
  .get((req, res) => {
    Products.isIdFound(Number(req.params.id))
      .then((products) => {
        console.log('products: ', {products});
        res.render('products', {products});
      })
      .catch((e) =>{
        console.error(e);
        res.json(e);
      })
  })
  .put(idCheck, (req,res) => {
    Products.editById(req.params.id, req.body.name, req.body.price, req.body.inventory)
      .then((products) => {
        res.redirect(`/products/${req.params.id}`);
      })
      .catch((e)=> {
        console.log(e);
        res.json(e);
      })
  })
  .delete(/*idCheckForDelete,*/ (req,res) => {
    console.log('req.params.id: ', req.params.id);
    Products.delete(req.params.id)
      .then((products) => {
        res.redirect('/products');
      })
      .catch((e)=> {
        console.log(e);
        res.json(e);
      })
  })



router.route('/:id/edit')
  .get((req,res) => {
    res.render('edit', {productId: req.params.id});
  })

module.exports = router;