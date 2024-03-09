const mongoose = require('mongoose');
const joi = require('joi');


const coverletterSchema = mongoose.Schema({
    fullName : {
        type: String,
        required: true
    },
    Address : {
        type: String,
        required: true
    },
    PhoneNumber : {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Education: {
        type: String,
        required: true
    },
    Pastcompany: {
        type: String,
        required: true
    },
    Experience: {
        type: Number,
        required: true
    },
    JobPosition: {
        type: String,
        required: true
    },
    CompanyName: {
        type: String,
        required: true
    },
    HRName: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: true
    }
});

const CoverLetter = mongoose.model('CoverLetter', coverletterSchema);



const coverletterValidtion = joi.object({
    fullName : joi.string().invalid('').min(3).max(32).required().messages({'any.invalid' : 'Full name is required.', 'string.empty' : ''}),
    Address : joi.string().invalid('').required().messages({'any.invalid' : 'Address is required.', 'string.empty' : ''}),
    PhoneNumber : joi.string().invalid('').required().messages({'string.pattern.base' : 'Invalid phone number', 'any.invalid' : 'Phone required field is required.', 'string.empty' : ''}),
    Email: joi.string().invalid('').email().required().messages({'any.invalid' : 'Email is required.', 'string.base.pattern' : 'Invalid Email.', 'string.empty' : ''}),
    Education: joi.string().invalid('').required().messages({'any.invalid' : 'Education field is required.', 'string.empty' : ''}),
    Pastcompany : joi.string().invalid('').required().messages({'any.invalid' : "Company's name field is required.", 'string.empty' : ""}),
    Experience : joi.number().min(0).required().messages({'number.min' : 'Invalid value for years of experience', 'string.empty' : 'Invalid value for years of experience'}),
    JobPosition : joi.string().invalid('').required().messages({'any.invalid' : 'Experience field is required.', 'string.empty' : ''}),
    CompanyName : joi.string().invalid('').required().messages({'any.invalid' : 'Company name field is required.', 'string.empty' : ''}),
    HRName : joi.string().invalid('').required().messages({'any.invalid' : 'HR name field is required.', 'string.empty' : ''}),
    Date : joi.string().invalid('').required().messages({'any.invalid' : 'Date field is required.', 'string.empty' : ''})
})

module.exports.coverletterSchema = coverletterSchema;
module.exports.CoverLetter = CoverLetter;
module.exports.coverletterValidtion = coverletterValidtion;

