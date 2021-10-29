const emailActionsEnum = require('../configs/email-actions.enum');

module.exports = {
    [emailActionsEnum.WELCOME]:
        {
            templateName: 'welcome',
            subject: 'Welcome'
        },
    [emailActionsEnum.LOGIN]:
        {
            templateName: 'login',
            subject: 'login'
        },
    [emailActionsEnum.DELETE]:
        {
            templateName: 'delete',
            subject: 'delete'
        },
    [emailActionsEnum.LOGOUT]:
        {
            templateName: 'logout',
            subject: 'logout'
        },
    [emailActionsEnum.UPDATE]:
        {
            templateName: 'update',
            subject: 'update'
        },
    [emailActionsEnum.CHANGE_PASSWORD]:
        {
            templateName: 'passwordChanger',
            subject: 'pass change'
        },
    [emailActionsEnum.REMEMBER]:
        {
            templateName: 'remember',
            subject: 'we haven\'t seen each other for a long time'
        },
};
