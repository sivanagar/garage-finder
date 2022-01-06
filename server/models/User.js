const { Schema, model, Types } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: 'Email address is required',
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    listings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Listing'
      }
    ],
  host: 
    {
      type: Boolean,
      required: true
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// get total count of listings on retrieval
userSchema.virtual('listingCount').get(function() {
  return this.listings.length;
});

const User = model('User', userSchema);

console.log()

module.exports = User;
