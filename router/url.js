const express = require('express');
const {handleGenerateShortUrl} = require('../controller/url')

const router = express.Router();


router.post('/',handleGenerateShortUrl);



module.exports = router; 

