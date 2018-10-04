const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'blrryr3cgky2uemy@ethereal.email',
        pass: '5eVrffS98yYvUkBg2D'
    }
})
module.exports = function (MailSender) {
    MailSender.on('dataSourceAttached', function (obj) {
        MailSender.create = function (mail, m, cb) {
            console.log(['info', 'send-email'], `Sending email to: ${mail.to}`)
            console.log(['coinbase,'], mail)
            mail.subject = mail.subject || `You have a new bid for ads!`

            mail.message = `There has been a is ${mail.cost} bid placed for Ads. It is for ${mail.days} this many days.${mail.mobileUrl} and ${mail.desktopUrl}`

            console.log(`Seding mail now: ${mail.subject} Hi ${mail.to}, ${mail.message}`)

            // Message object
            let content = {
                from: 'Sender Name <sender@example.com>',
                to: mail.to || 'Yield Manager <YieldManager@publisher.com>',
                subject: `${mail.subject}`,
                text: `${mail.message}`,
                html: `${mail.message}`,
                x:"r"
            }
            transporter.sendMail(content, (err, info) => {
                if (err) {
                    console.log('Error occurred. ' + err.message)
                    cb(err)
                    //return process.exit(1)
                }

                console.log('Message sent: %s', info.messageId)
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
                mail.info = info;
                mail.info1 = nodemailer.getTestMessageUrl(info)
                cb(null, mail)
            })
        }
    })
};