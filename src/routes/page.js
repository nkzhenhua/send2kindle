"use strict";
var express = require('express');
var router = express.Router();
var pageController = require('../controllers/pageController')

// Home page route.
router.post('/sendToKindle', pageController.sendLinkToKindle)

module.exports = router;