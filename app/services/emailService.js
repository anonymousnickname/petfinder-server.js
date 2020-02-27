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
        subject: "Job offer", // Subject line
        text: 'Dear Mr. Viktor Frunza, \n\n dWe are pleased to extend the following offer of employment to you on behalf of TomTom. You have been selected as the best candidate for the trainee Java developer position. Congratulations! The others details you will recieve later. \n\n Regards, TomTom company.'
    };
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });

}


