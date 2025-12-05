import nodemailer from "nodemailer";
import fs from "fs";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_KEY,
  },
});

export const sendMail = async ({ to, subject, html }) => {
  try {
    const from = `${process.env.SENDER_NAME} <${process.env.SENDER_EMAIL}>`;

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });

    return info;
  } catch (err) {
    console.error("Brevo OTP Error:", err);
    throw err;
  }
};

export const templateToHTML = (path) =>
  fs.readFileSync(path, "utf-8").toString();
