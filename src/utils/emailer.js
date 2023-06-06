import nodemailer from "nodemailer";
import EmailTemplates from "swig-email-templates";

const templates = new EmailTemplates({
  root: "src/templates",
});

export const sendEmailHelper =  (type, data) => {
  return new Promise((resolve, reject) => {
    templates.render("email.html", {}, async (err, html, text, subject) => {
      try {
        let mailTransporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "rajmangukiya00@gmail.com",
            pass: "jigsacbatknejput",
            clientId: '1016359510534-5l4clqoj2vhd9b3r63naaba4ggik2saq.apps.googleusercontent.com',
            clientSecret: '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',
            refreshToken: '1//041nK985n-dylCgYIARAAGAQSNwF-L9IrB3_BJjJQ-5Q2hbfQCkzTMkDAkXs2Z7VzcZ2j8rtOUu5NUfJuXWh5SmbAPyQLrri4hcY'
          },
        });

        let mailDetails = {
          from: "rajmangukiya00@gmail.com",
          to: data.email,
          subject: data?.subjectName,
          html: html,
          text: text,
        };

        let info = await mailTransporter.sendMail(mailDetails);

        resolve(info);
      } catch (err) {
        reject(err);
      }
    });
  });
};
