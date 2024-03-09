const { CoverLetter, coverletterValidtion } = require('../models/coverletterModel');


const coverletterController = {
    addCoverLetter : async (req, res, next) => {
        try{
            const {error}  = coverletterValidtion.validate(req.body, {abortEarly: false});

        
            if(error) {
                return res.status(404).json({errors : error.details});
            }

            let newCoverLetter = await CoverLetter.create(req.body);
            newCoverLetter = newCoverLetter._doc;

            res.json({message : "Your cover letter has been uploaded successfully", coverletter: {...newCoverLetter, userID: req.user.id}});
            next();
    
        }catch(err) {
            res.status(500).json({error : "An error occured while trying to post your cover letter. Please try again later"});
        }
    },

    removeCoverLetter : async (req, res, next) => {
        const coverletterID = req.params.id;
        if(!coverletterID) {
            return res.status(404).json({error: "Cover letter ID not given."});
        }

        try{
            let coverletter = await CoverLetter.findByIdAndDelete(coverletterID);
            if(!coverletter){
                return res.status(404).json({error: "No cover letter with such an ID exist in the database."});
            }

            res.json({message : "Cover letter deleted successfully", deletedCoverletter: coverletter});
            next();
        }catch(err) {
            res.status(500).json({error : "An error occured while trying to delete your cover letter. Please try again later"});
        }
    },

    getCoverLetter: async (req, res, next) => {
        const coverletterID = req.params.id;
        if(!coverletterID) {
            return res.status(404).json({error: "Cover letter ID not given."});
        }

        try{
            let coverletter = await CoverLetter.findById(coverletterID);
            if(!coverletter){
                return res.status(404).json({error: "No cover letter with such an ID exist in the database."});
            }

            res.json({message : "Cover letter retrieved successfully", coverletter: coverletter});
            next();
        }catch(err) {
            res.status(500).json({error : "An error occured while trying to retrieve your cover letter. Please try again later"});
        }
    },

    getAllCoverLetters: async (req, res, next) => {
        try{
            const { userID } = req.user; // the authorization middleware ensures that the requested doesn't get here unless the user is logged in 
            let coverletters = await CoverLetter.find({userID : userID});
            if(!coverletters){
                return res.json({message: "You have no cover letters yet."});
            }

            res.json({message : "Cover letters retrieved successfully", coverletters: coverletters});
            next();
        }catch(err) {
            res.status(500).json({error : "An error occured while trying to retrieve your cover letters. Please try again later"});
        }
    }, 
}

module.exports.coverletterController = coverletterController;