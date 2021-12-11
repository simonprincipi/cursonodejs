/* eslint-disable prefer-arrow-callback */
const mongoose = require('mongoose');
const validator = require('validator');
// const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name must not be empty!'],
      unique: true,
      trim: true,
      maxLength: [40, 'The name can contain a maximum of 40 characters!'],
      minLength: [10, 'The name must be at least 10 characters long!'],
      // validate: [validator.isAlpha, 'The name must only contain characters!'],
    },
    slug: String,
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1'],
      max: [5, 'Rating must be below 5'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      required: [true, 'Duration must be specified.'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Max group size must be specified.'],
    },
    difficulty: {
      type: String,
      required: [true, 'Difficulty must be specified.'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, dificult',
      },
    },
    price: {
      type: Number,
      required: [true, 'Price must be specified.'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on new document creation
          return val < this.price;
        },
        message: 'The discount {VALUE} must be lower than the price',
      },
    },
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description must be specified.'],
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'Cover image must be specified'],
      trim: true,
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//DOCUMENT MIDDLEWARE runs before only: .save(), .create()
// tourSchema.pre('save', function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

//QUERY MIDDLEWARE
// tourSchema.pre(/^find/, function (next) {
//   this.find({ secretTour: { $ne: true } });

//   this.start = Date.now();
//   next();
// });

// tourSchema.post(/^find/, function (doc, next) {
//   console.log(`Query took ${Date.now() - this.start} miliseconds`);
//   this.start = Date.now();
//   next();
// });

//AGGREGATION MIDDLEWARE
// tourSchema.pre('aggregate', function (next) {
//   this.pipeline.unshift({ $match: { secretTour: { $ne: true } } });
//   console.log(this.pipeline());
//   next();
// });

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
