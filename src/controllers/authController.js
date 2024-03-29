const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Channel = require('../models/Channel');

const warnController = require('./warnController');
const userSchema = require('../schemas/userSchema');

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
    const {username, email, password} = req.body;
    const hashedPassword = await hashPassword(password);
    const foundUser = await User.find({email});

    if (foundUser.length !== 0) { // Already created
        return warnController.warnResponse(res, 400, {
            title: 'Invalid email',
            description: 'Please checkup your email address and try again later.'
        });
    }

    if (userSchema.validate(req.body).error) {
        return warnController.warnResponse(res, 500, {
            title: 'Invalid data',
            description: 'Please checkup your data and try again later.'
        });
    }

    try {
        const userChannel = new Channel();
        const newUser = new User({
            username,
            email, 
            password: hashedPassword,
            channel: userChannel._id
        });
        
        userChannel.save();
        newUser.save();

        const userToken = createUserToken(newUser._id);

        res.cookie(COOKIE_NAME, userToken);
        return res.status(200).json({msg: 'User successfully created!'});
    } catch(error) {
        console.log(error);
        warnController.responseInternalError(res);
    }
}

module.exports.loginUser = async function(req, res) {
    const {email, password} = req.body;
    const foundUser = (await User.find({email}))[0];

    if (!foundUser) { // Incorrect email
        return res.status(400).json(warnController.getClientWarnJSON('Incorrect Data', 'Wrong email or password, plase verify your data and try again'));
    }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordCorrect) { // Incorrect password
        return res.status(400).json(warnController.getClientWarnJSON('Incorrect Data', 'Wrong email or password, plase verify your data and try again'));
    }

    const userToken = createUserToken(foundUser._id);

    res.cookie(COOKIE_NAME, userToken);
    return res.status(200).json({msg: 'User successfully logged in!'});
}

module.exports.logoutUser = async function(req, res) {
    res.clearCookie(COOKIE_NAME);
    return res.status(200).json({msg: 'User successfully logged out!'});
}

module.exports.getUser = async function(req, res) {
    const user = req.user;

    try {
        return res.json({data: {
            id: user.id,
            username: user.username,
            admin: user.admin
        }});
    } catch(error) {
        return warnController.responseInternalError(res);
    }
}

module.exports.getAdmins = async function(req, res) {
    const admins = User.find({admin: true});
    const queryResponse = admins.map((value) => {
        return {
            id: value.id
        }
    });

    return res.json({data: queryResponse});
}

module.exports.getUsersByName = async function(req, res) {
    const searchValue = req.params.username.replace(/\s/g, '');

    if (searchValue.length == 1) { // Not valid username
        return;
    }

    const dbUsers = await User.find({username: {$regex: searchValue, $options: 'i'}});
    const filteredDbUsers = dbUsers.filter((value) => {
        return (value.id !== req.user.id) || !value.admin;
    });

    const query = filteredDbUsers.map((value) => {
        return {
            id: value.id,
            username: value.username
        }
    });

    res.json({data: query});
}

module.exports.privateRoute = async function(req, res, next) {
    const token = req.cookies[COOKIE_NAME];

    if (!token) { // User doesn't have a cookie
        return res.status(401).json({msg: "Not authorized", type: 'error'});
    }

    try {
        const verifiedToken = jwt.verify(token, JWT_KEY);
        const user = await User.findById(verifiedToken.id);

        req.token = token;
        req.user = user;
        return next();
    } catch (error) {
        return warnController.responseInternalError(res);
    }
}