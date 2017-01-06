const express = require('express');
const router = express.Router();
const Products = require('../db/product');


const isObjEmpty = (req, res, next) => {
  if(Object.keys(req.body).length === 0) {
  console.log('req.body: ', req.body);
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
    var all = Products.all();
    res.render('index', {all: all});
  })
  .post(isObjEmpty, isInputValid, (req,res) => {

    Products.add(req.body);
    res.redirect('/products');
  })

router.route('/new')
  .get((req,res) => {
    res.render('new');
  })

router.route('/:id')
  .get((req, res) => {
    res.render(`/products/${req.params.id}`);
  })
  .put(idCheck, (req,res) => {
    Products.editById(req.params.id, req.body.name, req.body.price, req.body.inventory);
    res.redirect(`/products/${req.params.id}`);
  })
  .delete(idCheckForDelete, (req,res) => {
    Products.delete(req.params.id);
    res.redirect('/products');
  })

router.route('/:id/edit')
  .get((req,res) => {
    res.render('edit');
  })

module.exports = router;