const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
        user:'uniskortr@gmail.com',
        pass:'guok fnwg kxbs ngaq'

    }

}) 

let mailOptions = {
    from: 'uniskor.tr@gmail.com',
    to:'olcayyagdir@stu.aydin.edu.tr',
    subject:'nodemailer test'

}

const sendMail = (mailOptions) => {
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Mail gönderildi');
        }
    });
};


module.exports = sendMail;