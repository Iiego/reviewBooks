const express = require('express')
const router = express.Router();
const bookController = require('../controllers/bookController')

router.get('/', bookController.search);
router.get('/reviews', bookController.getAllReviews);

module.exports = router;