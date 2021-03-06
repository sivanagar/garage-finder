const faker = require('faker');

const db = require('../config/connection');
const { User, Listing } = require('../models');

db.once('open', async () => {
  await Listing.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();
    const host = false;

    userData.push({ username, email, password, host });
  }

  const createdUsers = await User.insertMany(userData);

  // create listing data

  const listingData = [];
  for (let i = 0; i < 100; i += 1) {
    const title = 'title' + faker.lorem.sentence();
    const address = faker.address.streetAddress();
    const type = faker.random.arrayElement([
      'Garage',
      'Shed',
      'Basement',
      'Attic',
    ]);
    const accessType = faker.random.arrayElement(['24hr', 'Scheduled']);
    const height = faker.random.number({ min: 1, max: 20 });
    const width = faker.random.number({ min: 1, max: 20 });
    const depth = faker.random.number({ min: 1, max: 20 });
    const description = faker.lorem.paragraph();
    const rate = faker.random.number({ min: 10, max: 2000 });
    const climateControl = faker.random.boolean();
    const randomUserIndex = Math.floor(Math.random() * userData.length);
    const { username, _id: userId } = createdUsers[randomUserIndex];
    const location = {
      type: 'Point',
      coordinates: [faker.address.longitude(), faker.address.latitude()],
    };
    const active = faker.random.boolean();

    const createListing = await Listing.create({
      title,
      address,
      type,
      accessType,
      height,
      width,
      depth,
      description,
      rate,
      climateControl,
      username,
      location,
      active,
    });
    const updateUser = await User.updateOne(
      { _id: userId },
      { $push: { listings: createListing._id }, $set: { host: true } }
    );

    listingData.push(createListing);
  }

  console.log('all done!');
  process.exit(0);
});
