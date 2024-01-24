const Message = require('../models/Message');
const User = require('../models/User');

function isStringEmpty(value) {
    return value.replace(' ', '') === '';
}

module.exports.createMessage = function(req, res) {
    const { user } = req;
    const messageContent = req.body.message;

    if (isStringEmpty(messageContent)) { // empty string
        return res.end();
    }

    const message = new Message({
        channel: user.channel,
        owner: user._id,
        username: user.username,
        content: messageContent,
        admin: user.admin
    });

    const io = req.app.get('socketio');
    io.emit('message', {
        owner: user._id,
        content: messageContent,
        creation: message.creation
    });

    message.save();
}

module.exports.getMessages = async function(req, res) {
    const { user } = req;

    const dbMessages = await Message.find({channel: user.channel});
    const responseMessages = [];

    dbMessages.forEach((value) => {
        console.log(value)
        responseMessages.push({
            owner: value.owner,
            content: value.content,
            creation: value.creation
        });
    });

    return res.json({data: responseMessages});
}

module.exports.getUserMessages = async function(req, res) {
    const {user} = req;

    if (!user.admin) {
        return;
    }

    const userTarget = await User.findById(req.params.userId);
    const messages = await Message.find({channel: userTarget.channel});

    const messagesQuery = messages.map((value) => {
        return {
            owner: value.owner,
            content: value.content,
            creation: value.creation
        }
    });

    console.log(await User.findOneAndUpdate({_id: user._id}, {channel: userTarget.channel}));

    return res.json({data: messagesQuery});
}