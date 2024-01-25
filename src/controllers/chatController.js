const Message = require('../models/Message');
const User = require('../models/User');

function isStringEmpty(value) {
    return value.replace(' ', '') === '';
}

function messageResponseInterface(dbMessage) {
    return {
        owner: dbMessage.owner,
        content: dbMessage.content,
        creation: dbMessage.creation,
        adminMessage: dbMessage.admin
    }
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
        creation: message.creation,
        adminMessage: message.admin
    });

    message.save();
}

module.exports.getMessages = async function(req, res) {
    const { user } = req;

    const dbMessages = await Message.find({channel: user.channel});
    const responseMessages = dbMessages.map((dbMessage) => messageResponseInterface(dbMessage));

    return res.json({data: responseMessages});
}

module.exports.getUserMessages = async function(req, res) {
    const {user} = req;

    if (!user.admin) {
        return;
    }

    const userTarget = await User.findById(req.params.userId);
    const messages = await Message.find({channel: userTarget.channel});

    const messagesQuery = messages.map((dbMessage) => messageResponseInterface(dbMessage));

    return res.json({data: messagesQuery});
}