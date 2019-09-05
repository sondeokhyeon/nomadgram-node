import path from "path";
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

export const generatorSecret = () => {
  const randumNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randumNumber]} ${nouns[randumNumber]}`;
};

export const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  console.log(options);
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (adress, secret) => {
  const email = {
    from: "mrson@noamdgram.com",
    to: adress,
    subject: "Login secret for nomadgram",
    html: `hello your login secret it ${secret}`
  };
  return sendMail(email);
};
