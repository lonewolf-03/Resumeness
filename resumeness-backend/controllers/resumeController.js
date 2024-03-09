const { Resume, resumeValidation } = require('../models/resumeModel');


const resumeController = {
    addResume : async (req, res, next) => {
        try{
            const { error } = resumeValidation.validate(req.body, {abortEarly: false});
        
            if(error) {
                return res.status(404).json({errors : error.details});
            }

            let newResume = await Resume.create(req.body);
            newResume = newResume._doc;

            res.json({message : "Your resume has been uploaded successfully", resume: {...newResume, userID: req.user.id}});
            next();
    
        }catch(err) {
            res.status(500).json({error : "An error occured while trying to post your resume. Please try again later"});
        }
    },

    removeResume : async (req, res, next) => {
        const resumeID = req.params.id;
        if(!resumeID) {
            return res.status(404).json({error: "Resume ID not given."});
        }

        try{
            const resume = await Resume.findByIdAndDelete(resumeID);
            if(!resume){
                return res.status(404).json({error: "No resume with such an ID exist in the database."});
            }

            res.json({message : "Resume deleted successfully", deletedResume: resume});
            next();
        }catch(err) {
            res.status(500).json({error : "An error occured while trying to delete your resume. Please try again later"});
        }
    },

    getResume: async (req, res, next) => {
        const resumeID = req.params.id;
        if(!resumeID) {
            return res.status(404).json({error: "Resume ID not given."});
        }

        try{
            const resume = await Resume.findById(resumeID);
            if(!resume){
                return res.status(404).json({error: "No resume with such an ID exist in the database."});
            }

            res.json({message : "Resume retrieved successfully", resume: resume});
            next();
        }catch(err) {
            res.status(500).json({error : "An error occured while trying to retrieve your resume. Please try again later"});
        }
    },

    getAllResumes: async (req, res, next) => {
        try{
            const { userID } = req.user; // the authorization middleware ensures that the requested doesn't get here unless the user is logged in 
            const resumes = await Resume.find({userID : userID});
            if(!resumes){
                return res.json({message: "You have no resumes yet."});
            }

            res.json({message : "Resumes retrieved successfully", resumes: resumes});
            next();
        }catch(err) {
            res.status(500).json({error : "An error occured while trying to retrieve your resumes. Please try again later"});
        }
    }, 
}

module.exports.resumeController = resumeController;