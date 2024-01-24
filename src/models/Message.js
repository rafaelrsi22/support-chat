const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    channel: {type: mongoose.SchemaTypes.ObjectId, required: true},
    owner: {type: mongoose.SchemaTypes.ObjectId, required: true},
    username: {type: String, required: true},
    content: {type: String, required: true, min: 1},
    creation: {type: Number, default: Date.now},
    admin: {type: Boolean, default: false}
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;