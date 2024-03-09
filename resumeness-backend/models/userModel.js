const  mongoose  = require('mongoose');
const joi = require('joi');

const userSchema = mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true,
    },

    email : {
        type: String,
        required: true,
        unique: true
    },

    password : {
        type: String,
        required: true,
        select: false
    }
});

const User = mongoose.model('User', userSchema);

module.exports.userSchema = userSchema;
module.exports.User = User;

const signUpSchema = joi.object({
    username : joi.string().invalid('').empty().min(3).max(25).required().messages({'any.invalid' : 'Username field is required.', 'string.min' : 'Username must be at least 3 characters', 'string.max' : 'Username can be at most 25 characters.', 'string.empty' : ''}),
    email : joi.string().invalid('').empty().email().required().messages({'any.invalid' : 'Email field is required.', 'string.email' : 'Invalid email.', 'string.empty' : ''}),
    password : joi.string().invalid('').empty().min(8).max(32).required().messages({'any.invalid' : 'Password field is required.', 'string.min' : 'Password must be at least 8 characters', 'string.max' : 'Password can be at most 32 characters.', 'string.empty' : ''}),
    confirmPassword: joi.string().invalid('').empty().valid(joi.ref("password")).required().messages({'any.only' : "Passwords don't match", 'any.invalid' : 'Confirm password field is required.', 'string.empty' : ''})
});

const signInSchema = joi.object({
    email : joi.string().invalid('').email().required().messages({'any.invalid' : 'Email field is required', 'string.empty' : ''}),
    password: joi.string().invalid('').min(8).max(32).required().messages({'any.invalid' : 'Password field is required', 'string.empty' : ''})
});

module.exports.signUpSchema = signUpSchema;
module.exports.signInSchema = signInSchema;