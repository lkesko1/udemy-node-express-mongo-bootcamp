const mongoose = require("mongoose");
const validator = require("validator");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
      trim: true,
      maxlength: [40, "A tour name must have less or equal 40 characters"],
      minlength: [10, "A tour name must have more then 10 characters"],
      //  validate: [validator.isAlpha, "Tour name must only contain characters"], - useful for emails
    },
    rating: { type: Number, default: 4.5 },
    duration: {
      type: Number,
      required: [true, "A tour must have a duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a group size"],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have a difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty error",
      },
    },
    ratingAvarage: {
      type: Number,
      default: 4.5,
      min: [0, "Ratings error"],
      max: [5, "rating error"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: { type: Number, required: [true, "A tour must have a price"] },
    priceDiscount: {
      type: Number,
      validate: {
        message: "Discount price ({VALUE}) should be below regular price",
        // ONLY WORK WITH NEW DOCUMENT, DOES NOT WORK WITH UPDATES
        validator: function (val) {
          return val < this.price;
        },
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "A tour must have a description"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have a cover image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
// tourSchema.pre("save", function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
