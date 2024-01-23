module.exports.createMessage = function(req, res) {
    const {message} = req.body;

    console.log(message);
}