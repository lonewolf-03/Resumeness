const { Router } = require("express");
const { resumeController } = require("../controllers/resumeController");
const { authorizationMiddleware } = require("../middlewares/authorizationMiddleware");


const resumeRouter = Router();

resumeRouter.get('/', authorizationMiddleware, resumeController.getAllResumes);
resumeRouter.get('/:id', authorizationMiddleware, resumeController.getResume);
resumeRouter.post('/add', authorizationMiddleware, resumeController.addResume);
resumeRouter.delete('/remove/:id', authorizationMiddleware, resumeController.removeResume);

module.exports.resumeRouter = resumeRouter;