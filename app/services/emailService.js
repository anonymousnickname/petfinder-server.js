const nodemailer = require('nodemailer');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

exports.sendMail = function(userEmail) {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        requireTLS: true,
        // service: 'Gmail',
        auth: {
            user: 'oleksandrkravets1995@gmail.com', // generated ethereal user
            pass: 'tyzetook12da'  // generated ethereal password
        }
    });

    var mailOptions = {
        to: userEmail, // list of receivers
        subject: "Petfinder", // Subject line
        html: '<p>Thank you that you chose Petfinder.</p>' +
            '<p>Click <a href="http://localhost:4200/login">here</a> and find a pet at Petfinder</p>'
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });

}

exports.sendRefusalMail = function(userEmail) {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        requireTLS: true,
        // service: 'Gmail',
        auth: {
            user: 'oleksandrkravets1995@gmail.com', // generated ethereal user
            pass: 'tyzetook12da'  // generated ethereal password
        }
    });

    var mailOptions = {
        to: userEmail, // list of receivers
        subject: "Petfinder", // Subject line
        html: '<p>Manager deleted your announcement</p>' +
            '<p>If you want to add some new announcement, please be sure that you use Petfinder rules</p>'
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });

}


