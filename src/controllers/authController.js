const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const {JWT_KEY} = process.env;
const COOKIE_NAME = 'authorization-key'

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
    const hashedPassword = await hashPassword(req.body.password);
    const foundUser = await User.find({email});

    if (foundUser.length !== 0) { // Already created
        return;
    }

    try {
        const newUser = new User({username, email, password: hashedPassword});
        newUser.save();

        const userToken = createUserToken(newUser._id);

        res.cookie(COOKIE_NAME, userToken);
        res.status(200).send({msg: 'User successfully created!'});
    } catch(error) {
        console.log(error);
        return res.status(500).send('Oh no! Internal Error has ocurred, please try again later.');
    }
}

module.exports.loginUser = async function(req, res) {
    const {email, password} = req.body;
    const foundUser = (await User.find({email}))[0];

    if (!foundUser) { // Incorrect email
        return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordCorrect) { // Incorrect password
        return;
    }

    const userToken = createUserToken(foundUser._id);

    res.cookie(COOKIE_NAME, userToken);
    res.status(200).send({msg: 'User successfully logged in!'});
}