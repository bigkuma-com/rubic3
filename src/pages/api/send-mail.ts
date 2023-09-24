import type { NextApiRequest, NextApiResponse } from "next";
import { IEmailResponseData } from "../../utils/types";
var nodemailer = require("nodemailer");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IEmailResponseData>
) {
  try {
    const { method, body } = req;
    const { name, company, phone, email, message } = body;

    if (!name || !company || !phone || !email || !message) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    } else {
      switch (method) {
        case "POST": {
          await mail({
            subject: `A message from ${name} - ${company}`,
            content: `
            <div marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" bgcolor="#eaeeef" leftmargin="0">
              <div cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <div style="background-color: #f2f3f8; max-width:670px; margin:0 auto; padding:32px;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                  <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:600px; background:#fff; border-radius:3px; text-align:left;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                    <div style="padding:40px;">
                      <h1 style="color: #1e1e2d; font-weight: 500; margin: 0;margin-bottom:24px; font-size: 32px;font-family:'Rubik',sans-serif;">Hello Rubic3 Team,</h1>
                      <p style="font-size:15px; color:#455056; line-height:24px; margin:8px 0 30px;">There's a message from <strong>${name} - ${company}</strong>!</p>
                      <p style="font-size:15px; color:#455056; line-height:24px; margin:8px 0 30px;">${message}</p>
                      <p style="font-size:15px; color:#455056; line-height:24px; margin:8px 0 30px;">Please contact them at <strong>${phone}</strong> or <strong>${email}</strong></p>
                    </div>
                  </table>
                </div>
              </div>
            </div>
          `,
          });
          res.status(200).send({ message: "OK" });
          break;
        }
        default:
          res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
          res.status(405).end(`Method ${method} Not Allowed`);
          break;
      }
    }
  } catch (err) {
    res.status(400).json({
      message: "error eheh",
    });
  }
}

export async function mail({
  subject,
  content,
}: {
  subject: string;
  content: any;
}) {
  let transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: process.env.NODEMAILER_SEND_TO,
    subject: subject,
    html: content,
  };

  await new Promise((resolve, reject) => {
    transporter.verify(function (error: any, success: any) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, async function (error: any, info: any) {
      if (error) {
        console.log(error);
        throw new Error(error);
      } else {
        console.log("Email Sent");
        return true;
      }
    });
  });
}
