const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const { NO_REPLY_EMAIL_PASSWORD, NO_REPLY_EMAIL } = require('../configs/config');
const allTemplates = require('../email-templates');
const ErrorHandler = require('../errors/ErrorHandler');
const { errorsEnumCode, errorsEnumMessage } = require('../errors/');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NO_REPLY_EMAIL,
        pass: NO_REPLY_EMAIL_PASSWORD
    }
});

module.exports = {
    sendMail: async ( userMail, emailAction, context = {} ) => {

        const templateInfo = allTemplates[emailAction];

        if ( !templateInfo ) {
            throw new ErrorHandler(errorsEnumMessage.WRONG_TEMPLATE, errorsEnumCode.NO_RESPONSE);
        }

        const html = await templateParser.render(templateInfo.templateName, context);

        console.log(html); // fix email send to local dev
        return transporter.sendMail({
            from: 'Zuwwie',
            to: userMail,
            subject: templateInfo.subject,
            html
        });
    },
};
