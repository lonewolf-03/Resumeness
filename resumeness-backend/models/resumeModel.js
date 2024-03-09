const mongoose = require('mongoose');
const joi = require('joi');
require('mongoose-type-url');

const resumeSchema = mongoose.Schema({
    full_name : {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    linkedin: {
        type: mongoose.SchemaTypes.Url,
        required: false
    },
    portfolio: {
        type: mongoose.SchemaTypes.Url,
        required: false,
    },
    personalImg: {
        type: String,
        required: true
    },
    objective: {
        type: String,
        required: false,
    },
    jobsNum: {
        type: Number,
        default: 0,
        required: true
    },
    jobTitle: {
        type: [String],
        required: () => (this.jobsNum > 0)
    },
    company: {
        type: [String],
        required: () => (this.jobsNum > 0)
    },
    employmentDate: {
        type : [String],
        required: () => (this.jobsNum > 0)
    },
    companyLoc: {
        type: [String],
        required: () => (this.jobsNum > 0)
    },
    companyDescription: {
        type: [String],
        required: () => (this.jobsNum > 0)
    },
    responsibilities: {
        type: [String],
        required: () => (this.jobsNum > 0)
    },
    bachelorCheck: {
        type: Boolean,
        default: false,
        required : true
    },
    bachelor: {
        type: String,
        required: () => (this.bachelorCheck)
    },
    bachelorInstitution: {
        type: String,
        required: () => (this.bachelorCheck)
    },
    bachelorLoc: {
        type: String,
        required: () => (this.bachelorCheck)
    },
    bachelorGradDate: {
        type: String,
        required: () => (this.bachelorCheck)
    },
    bachelorAwards: {
        type: String,
        required: () => (this.bachelorCheck)
    },
    masterCheck: {
        type: Boolean,
        default: false,
        required: true
    },
    master: {
        type: String,
        required: () => (this.masterCheck)
    },
    masterInstitution: {
        type: String,
        required: () => (this.masterCheck)
    },
    masterLoc: {
        type: String,
        required: () => (this.masterCheck)
    },
    masterGradDate: {
        type: String,
        required: () => (this.masterCheck)
    },
    masterAwards: {
        type: String,
        required: () => (this.masterCheck)
    },
    phdCheck: {
        type: Boolean,
        default: false,
        required: true
    },
    phd: {
        type: String,
        required: () => (this.phdCheck)
    },
    phdInstitution: {
        type: String,
        required: () => (this.phdCheck)
    },
    phdLoc: {
        type: String,
        required: () => (this.phdCheck)
    },
    phdGradDate: {
        type: String,
        required: () => (this.phdCheck)
    },
    phdAwards: {
        type: String,
        required: () => (this.phdCheck)
    },
    skills: {
        type: String,
        required: false
    },
    hobbies: {
        type: String,
        required: false
    },
    volunteer: {
        type: String,
        required: false
    }
});

const Resume = mongoose.model('Resume', resumeSchema);

const resumeValidation = joi.object({
    full_name : joi.string().invalid('').min(3).max(32).required().messages({'any.required' : 'Full name is required.', 'any.invalid' : 'Full name is required.', 'string.empty' : ''}),
    address: joi.string().invalid('').required().messages({'any.required' : 'Address is required.', 'any.invalid' : 'Address is required.',  'string.empty' : ''}),
    phone : joi.string().invalid('').required().messages({'string.pattern.base' : 'Invalid phone number.', 'any.required' : 'Phone number is required.', 'any.invalid' : 'Phone number is required.', 'string.empty' : ''}),
    email : joi.string().invalid('').email().required().messages({'string.email' : 'Invalid email.', 'any.required' : 'Email is required.', 'any.invalid' : 'Email is required.', 'string.empty' : ''}),
    linkedin : joi.string().uri().allow('').optional().messages({'string.uri' : 'Linkedin profile must be a url (the protocol must be indicated e.g. https://)'}),
    portfolio : joi.string().uri().allow('').optional().messages({'string.uri' : 'Portfolio must be a url (the protocol must be indicated e.g. https://)'}),
    personalImg: joi.string().invalid('').pattern(/^data:image\/(png|jpeg|jpg);base64,.+$/).required().messages({'string.pattern.base' : 'Personal image can  be a png, jpeg, or jpg file.', 'any.required' : 'Personal image is required.', 'any.invalid' : 'Personal image can  be a png, jpeg, or jpg file.', 'string.empty' : ''}),
    objective: joi.string().allow('').optional(),
    jobsNum : joi.number().min(0).default(0).required().messages({'any.invalid' : 'Invalid value for jobs number', 'any.required' : 'Jobs number is required.', 'string.empty' : 'Jobs number is required', 'number.min' : 'Invalid value for jobs number.'}),
    jobsTitle: joi.alternatives().conditional('jobsNum', {
        is: joi.number().greater(0),
        then: joi.array().items(joi.string()).min(1).length(joi.ref('jobsNum')).required().messages({'array.min' : "Job titles are required", 'array.empty' : '', 'array.length' : "Number of job titles doesn't match jobs number"}),
        otherwise: joi.forbidden()
    }).messages({'any.required' : 'Job titles are required.'}),
    company: joi.alternatives().conditional('jobsNum', {
        is: joi.number().greater(0),
        then: joi.array().items(joi.string()).min(1).length(joi.ref('jobsNum')).required().messages({'array.min' : "Companies are required", 'array.empty' : '', 'array.length' : "Companies number doesn't match jobs number"}),
        otherwise: joi.forbidden()
    }).messages({'any.required' : 'Companies fields are required.'}),
    employmentDate: joi.alternatives().conditional('jobsNum', {
        is: joi.number().greater(0),
        then: joi.array().items(joi.string()).min(1).length(joi.ref('jobsNum')).required().messages({'array.min' : "Employment dates are required", 'array.empty' : '', 'array.length' : "Number of employment dates doesn't match jobs number"}),
        otherwise: joi.forbidden()
    }).messages({'any.required' : 'Employment dates are required.'}),
    companyLoc: joi.alternatives().conditional('jobsNum', {
        is: joi.number().greater(0),
        then: joi.array().items(joi.string()).min(1).length(joi.ref('jobsNum')).required().messages({'array.min' : "Companies locations are required", 'array.empty' : '', 'array.length' : "Number of companies locations doesn't match jobs number"}),
        otherwise: joi.forbidden()
    }).messages({'any.required' : 'Companies locations are required.'}),
    companyDescription: joi.alternatives().conditional('jobsNum', {
        is: joi.number().greater(0),
        then: joi.array().items(joi.string().allow('')).optional(),
        otherwise: joi.forbidden()
    }).messages({'any.required' : 'Companies desicriptions are required.'}),
    responsibilities: joi.alternatives().conditional('jobsNum', {
        is: joi.number().greater(0),
        then: joi.array().items(joi.string()).min(1).length(joi.ref('jobsNum')).required().messages({'array.min' : "Responsibilities are required", 'array.empty' : '', 'array.length' : "Number of responsibilities doesn't match jobs number"}),
        otherwise: joi.forbidden()
    }).messages({'any.required' : 'Responsibilities fields are required.'}),
    bachelorCheck: joi.boolean().default(false).required(),
    bachelor: joi.alternatives().conditional('bachelorCheck', {
        is: joi.boolean().equal(true),
        then: joi.string().invalid('').required().messages({'any.required' : 'Bachelor degree is required.', 'any.invalid' : 'Bachelor degree is required.', 'string.empty' : ''}),
        otherwise: joi.forbidden()
    }),
    bachelorInstitution: joi.alternatives().conditional('bachelorCheck', {
        is: joi.boolean().equal(true),
        then: joi.string().invalid('').required().messages({'any.required' : 'Bachelor degree institution is required.', 'any.invalid' : 'Bachelor degree institution is required.', 'string.empty' : ''}),
        otherwise: joi.forbidden()
    }),
    bachelorLoc: joi.alternatives().conditional('bachelorCheck', {
        is: joi.boolean().equal(true),
        then: joi.string().invalid('').required().messages({'any.required' : 'Bachelor degree institution location is required.', 'any.invalid' : 'Bachelor degree institution location is required.', 'string.empty' : ''}),
        otherwise: joi.forbidden()
    }),
    bachelorGradDate: joi.alternatives().conditional('bachelorCheck', {
        is: joi.boolean().equal(true),
        then: joi.string().invalid('').required().messages({'any.required' : 'Bachelor degree graduation date is required.', 'any.invalid' : 'Bachelor degree graduation date is required.', 'string.empty' : ''}),
        otherwise: joi.forbidden()
    }),
    bachelorAwards: joi.alternatives().conditional('bachelorCheck', {
        is: joi.boolean().equal(true),
        then: joi.string().allow('').optional(),
        otherwise: joi.forbidden()
    }),
    masterCheck: joi.boolean().default(false).required(),
    master: joi.alternatives().conditional('masterCheck', {
        is: joi.boolean().equal(true),
        then: joi.string().invalid('').required().messages({'any.required' : 'Masters degree is required.', 'any.invalid' : 'Masters degree is required.', 'string.empty' : ''}),
        otherwise: joi.forbidden()
    }),
    masterInstitution: joi.alternatives().conditional('masterCheck', {
        is: joi.boolean().equal(true),
        then: joi.string().invalid('').required().messages({'any.required' : 'Masters degree instituion is required.', 'any.invalid' : 'Masters degree institution is required.', 'string.empty' : ''}),
        otherwise: joi.forbidden()
    }),
    masterLoc: joi.alternatives().conditional('masterCheck', {
        is: joi.boolean().equal(true),
        then: joi.string().invalid('').required().messages({'any.required' : 'Masters degree institution location is required.', 'any.invalid' : 'Masters degree institution location is required.', 'string.empty' : ''}),
        otherwise: joi.forbidden()
    }),
    masterGradDate: joi.alternatives().conditional('masterCheck', {
        is: joi.boolean().equal(true),
        then: joi.string().invalid('').required().messages({'any.required' : 'Masters degree graduation date is required.', 'any.invalid' : 'Masters degree graduation date is required.', 'string.empty' : ''}),
        otherwise: joi.forbidden()
    }),
    masterAwards: joi.alternatives().conditional('masterCheck', {
        is: joi.boolean().equal(true),
        then: joi.string().allow('').optional(),
        otherwise: joi.forbidden()
    }),
    phdCheck: joi.boolean().default(false).required(),
    phd: joi.alternatives().conditional('phdCheck', {
        is: joi.boolean().equal(true),
        then: joi.string().invalid('').required().messages({'any.required' : 'PhD degree is required.', 'any.invalid' : 'PhD degree is required.', 'string.empty' : ''}),
        otherwise: joi.forbidden()
    }),
    phdInstitution: joi.alternatives().conditional('phdCheck', {
        is: joi.boolean().equal(true),
        then: joi.string().invalid('').required().messages({'any.required' : 'PhD degree institution is required.', 'any.invalid' : 'PhD degree instituion is required.', 'string.empty' : ''}),
        otherwise: joi.forbidden()
    }),
    phdLoc: joi.alternatives().conditional('phdCheck', {
        is: joi.boolean().equal(true),
        then: joi.string().invalid('').required().messages({'any.required' : 'PhD degree institution location is required.', 'any.invalid' : 'PhD degree institution location is required.', 'string.empty' : ''}),
        otherwise: joi.forbidden()
    }),
    phdGradDate: joi.alternatives().conditional('phdCheck', {
        is: joi.boolean().equal(true),
        then: joi.string().invalid('').required().messages({'any.required' : 'PhD degree gradution date is required.', 'any.invalid' : 'PhD degree is required.', 'string.empty' : ''}),
        otherwise: joi.forbidden()
    }),
    phdAwards: joi.alternatives().conditional('phdCheck', {
        is: joi.boolean().equal(true),
        then: joi.string().allow('').optional(),
        otherwise: joi.forbidden()
    }),

    skills: joi.string().allow('').optional(),
    hobbies: joi.string().allow('').optional(),
    volunteer: joi.string().allow('').optional()
});

module.exports.resumeSchema = resumeSchema;
module.exports.Resume = Resume;
module.exports.resumeValidation = resumeValidation;