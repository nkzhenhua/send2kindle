"use strict";
var express = require('express');
var router = express.Router();
var pageController = require('../controllers/pageController')
var arkFundLoadController = require('../controllers/arkFundLoadController')

// Home page route.
router.post('/crawlArkETFData', arkFundLoadController.loadArkFundsFiles)
router.post('/sendToKindle', pageController.sendLinkToKindle)
router.get('/', pageController.home)

module.exports = router;