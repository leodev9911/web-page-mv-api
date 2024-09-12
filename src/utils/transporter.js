const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'neniruano@gmail.com',
        pass: 'bxja xiah olpz lmox',
    },
});

module.exports = transporter;