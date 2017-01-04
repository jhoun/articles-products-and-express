const express = require('express');
const router = express.Router();

router.route('/')
  .post((req,res) => {
    res.send('thanks');
  })


module.exports = router;