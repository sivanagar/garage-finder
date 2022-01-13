const nodemailer = require('nodemailer');
const mailSettings = require('../config/emailConnection');
let transporter = nodemailer.createTransport(mailSettings);

async function sendContactMessage(message, host, guest, listingId) {
  const htmlBody = `<h2>${guest.username} HAS CONTACT YOU ABOUT YOUR LISTING</h2>
  <p> LISTING DETAILS: <a href='https://cache-project.herokuapp.com/listing/${listingId}'>https://cache-project.herokuapp.com/listing/${listingId} </a></p>
  <p>${message}  </p>`;

  const mailContent = {
    from: '"CACHE" <nearby.cache@gmail.com>', // sender address
    to: [host.email, guest.email], // list of receivers
    cc: 'nearby.cache@gmail.com',
    subject: `SOMEONE CONTACTED YOU ABOUT YOUR LISTING`, // Subject line- need to be event name
    text: `SOMEONE CONTACTED YOU ABOUT YOUR LISTING`, // plain text body
    html: htmlBody, // html body
  };

  const info = await transporter
    .sendMail(mailContent)
    .catch((err) => console.error(err));
  return info;
}

module.exports = sendContactMessage;
