module.exports = {
    userNormalizator: ( userNormalize = {} ) => {
        const fieldsToRemove = ['password'];

        fieldsToRemove.forEach(( field ) => {
            delete userNormalize[field];
        });

        return userNormalize;
    },
    userTokenNormalizator: ( userNormalize = {} ) => {
        const fieldsToRemove = ['password'];

        fieldsToRemove.forEach(( field ) => {
            delete userNormalize.user_id[field];
        });

        return userNormalize;
    },
};
