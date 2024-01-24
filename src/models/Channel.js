const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({});

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;