const { Schema, model, Types } = require('mongoose');

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: 'Title is required',
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['garage', 'shed', 'basement', 'attic'],
    },
    accessType: {
      type: String,
      enum: ['24hr', 'scheduled'],
    },
    height: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    depth: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: 'Description is required',
      trim: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    climateControl: {
      type: Boolean,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  {
    // toJSON: {
    //   virtuals: true,
    //   getters: true
    // },
    // id: false
  }
);

// get volume on retrieval
// listingSchema.virtual('volume').get(function() {
//     return (this.height * this.width * this.depth)
//     }
//   );
listingSchema.index({ location: '2dsphere' });

const Listing = model('Listing', listingSchema);

module.exports = Listing;
