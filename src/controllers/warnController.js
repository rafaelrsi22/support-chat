module.exports.getClientWarnJSON = function(title, description) {
    return {
        data: {title, description},
        type: 'error'
    };
}