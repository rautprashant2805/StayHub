const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listing.js");

router.route("/")
  .get(wrapAsync(listingController.index)) // INDEX Route
  .post(
    isLoggedIn,
    upload.single(`listing[image]`),
    validateListing,
    wrapAsync(listingController.createListing)  // Create Route
  );

router.route("/new").get(isLoggedIn, listingController.renderNewForm); // New Route

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) // SHOW Route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing) // Udate Route
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing) //Delete Route
  );


router
  .route("/:id/edit")
  .get(isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));// Edit Route

module.exports = router;
