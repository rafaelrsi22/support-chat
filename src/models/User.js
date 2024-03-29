const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, min: 3, max: 16},
    password: {type: String, required: true},
    email: {type: String, required: true, min: 8, max: 128},
    channel: {type: mongoose.SchemaTypes.ObjectId, required: true},
    admin: {type: Boolean, default: false}
});

const User = mongoose.model('User', userSchema);

module.exports = User;