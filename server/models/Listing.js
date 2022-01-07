const { Schema, model, Types } = require('mongoose');

// the following block of code tests address geocoding
// const NodeGeocoder = require('node-geocoder');

// const options = {
//   provider: 'google',

//   apiKey: '', // for Mapquest, OpenCage, Google Premier
//   formatter: null // 'gpx', 'string', ...
// };

// const geocoder = NodeGeocoder(options);

// ( async function () {
// // Using callback
// const res = await geocoder.geocode('227 mangels ave san francisco ca');
// console.log(res);
// }
// ()
// )

const listingSchema = new Schema(
  {
    // listingId: {
    //   type: Schema.Types.ObjectId,
    //   default: () => new Types.ObjectId()
    // },
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
    location: {
      type: {
        type: String, 
        enum: ['Point'], 
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
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

const Listing = model('Listing', listingSchema);

module.exports = Listing;
