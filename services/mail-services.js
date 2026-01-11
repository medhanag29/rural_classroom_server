import fs from "fs";
import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendMail = async ({ to, subject, html }) => {
  try {
    const response = await emailApi.sendTransacEmail({
      subject,
      htmlContent: html,
      sender: {
        name: process.env.SENDER_NAME,
        email: process.env.SENDER_EMAIL,
      },
      to: Array.isArray(to) ? to.map((email) => ({ email })) : [{ email: to }],
    });

    return response;
  } catch (err) {
    console.error("Brevo API Email Error:", err?.response?.text || err.message);
    throw err;
  }
};

export const templateToHTML = (path) =>
  fs.readFileSync(path, "utf-8").toString();
