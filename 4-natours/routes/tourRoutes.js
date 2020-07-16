const express = require("express");
const tourController = require("../controllers/tourController");

const router = express.Router();

// Example how to use middleware to check ID
// router.param("id", tourController.checkID);

router
  .route("/top-5-tours")
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route("/tour-stats").get(tourController.getTourStats);
router.route("/monthly-plan/:year").get(tourController.getMonthlyPlan);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);

// Example how to use middleware in route
// .post(tourController.checkBody, tourController.createTour);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
