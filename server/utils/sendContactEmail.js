const nodemailer = require('nodemailer');
const mailSettings = require('../config/emailConnection');
let transporter = nodemailer.createTransport(mailSettings);

async function sendContactMessage(message, host, guest) {
  const htmlBody = `<h2>${guest.username} NAME HAS CONTACT YOU ABOUT YOUR LISTING</h2>
  <p> LISTING DETAILS </p>
  <p>${message}  </p>`;

  const mailContent = {
    from: '"CACHE" <nearby.cache@gmail.com>', // sender address
    to: [host.email, guest.email], // list of receivers
    subject: `SOMEONE CONTACTED YOU ABOUT YOUR LISTING`, // Subject line- need to be event name
    text: `SOMEONE CONTACTED YOU ABOUT YOUR LISTING`, // plain text body
    html: htmlBody, // html body
  };

  const info = await transporter
    .sendMail(mailContent)
    .catch((err) => console.error(err));
  console.log(info);
}

module.exports = sendContactMessage;

// const host = {
//   email: 'nearby.cache@gmail.com',
// };

// const message = 'this is a contact message';
// const guest = {
//   username: 'sivanagar',
//   email: 'sivanagar@gmail.com',
// };
// sendContactMessage(message, host, guest);
