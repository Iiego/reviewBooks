const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../authMiddleware');

router.post('/', authMiddleware, reviewController.review);
router.put('/edit', authMiddleware, reviewController.editReview);
router.get('/userReviews', authMiddleware, reviewController.getAllUserReviews);
router.get('/bookReviews', authMiddleware, reviewController.getAllBookReviews)

module.exports = router;