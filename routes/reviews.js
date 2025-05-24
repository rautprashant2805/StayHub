const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/reviews.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const { model } = require("mongoose");
const reviewController = require("../controllers/reviews.js");

// Reviwes
//POST  review Route
// router.post("/listings/:id/reviews",validateReview, wrapAsync(async(req, res)=>{
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// DELETE review route
// router.delete("/listings/:id/reviews/:reviewId", wrapAsync(async(req,res,next)=>{
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
