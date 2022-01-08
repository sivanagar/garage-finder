require('dotenv').config();

const mailSettings = {
  service: 'gmail',
  host: process.env.MAIL_NAME,
  debug: true,
  logger: true,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    // type: 'login',
    user: process.env.MAIL_USER, // needs to go in env
    pass: process.env.MAIL_PASSWORD, // needs to go in env
  },
};

module.exports = mailSettings;
