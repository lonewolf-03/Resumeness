const { Router } = require("express");
const { authenticationController } = require("../controllers/authenticationController");
const { authorizationMiddleware } = require('../middlewares/authorizationMiddleware');

const authRouter = Router();

authRouter.post('/login', authenticationController.login);
authRouter.post('/signup', authenticationController.signUp);
authRouter.post('/me', authorizationMiddleware ,authenticationController.me);

module.exports.authRouter = authRouter;