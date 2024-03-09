const { User, signUpSchema, signInSchema } = require('../models/userModel');
const mongoose = require('mongoose');
const  bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');



const authenticationController = {
    login: async (req, res, next) => {
        const { error } = signInSchema.validate(req.body, {abortEarly: false});

        if(error) { 
            return res.status(422).json({error: error.details});
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email : email }, "+password");

        if(!user) {
            return res.status(400).json({error: 'Invalid email or password.'});
        }

            

        try {
            const isCorrectPassword = bcrypt.compare(password, user.password);

            if(!isCorrectPassword) {
                return res.status(400).json({error : 'Invalid email or password'});
            }

            const token = jwt.sign({id : user.id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
            res.json({message: 'Logged in successfully. ', token : token});

            next();
        } catch (error) {
            res.status(500).json({error: 'An error happened while trying to log you in. Please try again later. '});
        }
    },

    signUp: async (req, res, next) => {
        const { error } = signUpSchema.validate(req.body, {abortEarly: false});

        if(error) {
            return res.status(422).json({error : error.details});
        }

        const user = await User.findOne({email : req.body.email});

        if(user) {  // the email is used
            console.log(user);
            return res.status(400).json({error: 'Email already used.'});
        }

        try{
            const { password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            let newUser = {...req.body , password: hashedPassword};
            newUser = await User.create(newUser);
            res.json({message : 'User signed up successfully. ', newUser: newUser});
            next();
        }catch (error) {
            res.status(500).json({error : 'An error happened while trying to sign you up. Please try agian later. '});
        }
    },

    me: (req, res, next) => {
        try {
            res.status(200).json({ user: req.user });
            next();
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "An error occurred while fetching your data." });
        }
    }
}

module.exports.authenticationController = authenticationController;