import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';

const nodemailerMailgun = nodemailer.createTransport(
  mg({
    // host: 'api.eu.mailgun.net',
    // host: 'api.mailgun.net/v3',
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
  })
);

export const sendEmail = ({ to, subject, html }) => {
  return new Promise((resolve, reject) => {
    if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
      console.log('You need to provide MAILGUN_API_KEY and MAILGUN_DOMAIN environment variables for sending emails.');
      return resolve('An error occurred while sending an email: (Credentials missing).');
    }

    console.log(`Sending email to ${to}`);

    nodemailerMailgun.sendMail(
      {
        from: 'Orca <admin@orca.com>',
        to,
        subject,
        html,
      },
      function (err, info) {
        if (err) {
          console.log('An error occurred while sending an email: ', err);
          return reject(err);
        } else {
          console.log(`Sending email ${JSON.stringify(info)}`);
          return resolve(info);
        }
      }
    );
  });
};
