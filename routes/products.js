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

router.route('/')
  .post(isObjEmpty, isInputValid, (req,res) => {
    Products.add(req.body);
    res.redirect('/products');
  })

router.route('/new')
  .get((req,res) => {
    res.render('index');
  })

router.route('/:id')
  .put(idCheck, (req,res) => {
    Products.editById(req.params.id, req.body.name);
    res.redirect(`/products/${req.params.id}`);
  })

router.route('/:id/edit')
  .get((req,res) => {
    res.render('edit');
  })

//do put, then check get to make sure that name property changes


module.exports = router;