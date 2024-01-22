const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const {JWT_KEY} = process.env;

function createUserToken(userId) {
    return jwt.sign({id: userId}, JWT_KEY, {expiresIn: '24h'});
}

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
}

module.exports.registerUser = async function(req, res) {
    const {username, email} = req.body;
    const password = await hashPassword(req.body.password);

    try {
        const newUser = new User({username, email, password});
        newUser.save();

        const userToken = createUserToken(newUser._id);

        res.cookie('authorization-key', userToken);
        res.status(200).send({msg: 'User successfully created!'});
    } catch(error) {
        console.log(error);
        return res.status(500).send('Oh no! Internal Error has ocurred, please try again later.');
    }
}
