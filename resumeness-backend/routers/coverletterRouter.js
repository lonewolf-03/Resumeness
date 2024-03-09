const { Router } = require("express");
const { coverletterController } = require("../controllers/coverletterController");
const { authorizationMiddleware } = require("../middlewares/authorizationMiddleware");


const coverletterRouter = Router();

coverletterRouter.get('/', authorizationMiddleware, coverletterController.getAllCoverLetters);
coverletterRouter.get('/:id', authorizationMiddleware, coverletterController.getCoverLetter);
coverletterRouter.post('/add', authorizationMiddleware, coverletterController.addCoverLetter);
coverletterRouter.delete('/remove/:id', authorizationMiddleware, coverletterController.removeCoverLetter);

module.exports.coverletterRouter = coverletterRouter;