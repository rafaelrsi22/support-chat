module.exports.getClientWarnJSON = function(title, description) {
    return {
        data: {title, description},
        type: 'error'
    };
}

module.exports.warnResponse = function(response, status, {title, description, ...other}) {
    const json = {
        data: {
            title, 
            description,
            ...other
        },
        type: 'error'
    }

    response.status(status).json(json);
}

module.exports.responseInternalError = function(response) {
    this.warnResponse(response, 500, {
        title: 'Internal Error',
        description: 'Oh no! Internal Error has ocurred, please try again later.'
    });
}