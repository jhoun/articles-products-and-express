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

router.route('/')
  .post(isObjEmpty, isInputValid, (req,res) => {
    Products.add(req.body);
    res.redirect('/products');
  })



module.exports = router;