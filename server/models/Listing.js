const { Schema, model, Types } = require('mongoose');
const bcrypt = require('bcrypt');
const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'google',

  apiKey: 'AIzaSyBBEvMZ97GMsX9Cjov-jLlYf1fLy-0Hu3A', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

// the following block of code tests address geocoding
// ( async function () {
// // Using callback
// const res = await geocoder.geocode('227 mangels ave san francisco ca');
// console.log(res);
// }
// ()
// )

const listingSchema = new Schema(
  {
    listingId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    address: {
      type: String,
      required: true,
    },
    type: {
        type: String,
        enum: ['garage', 'shed', 'basement', 'attic']
    },
    accessType: {
        type: String,
        enum: ['24hr', 'sheduled']
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
        trim: true
    },
    rate: {
        type: Number,
        required: true,
    },
    user: 
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    climateControl: 
    {
        type: Boolean,
        required: true
    }
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// get volume on retrieval
listingSchema.virtual('volume').get(function() {
    return (this.height * this.width * this.depth) 
    }
  );

const Listing = model('Listing', listingSchema);

module.exports = Listing;
