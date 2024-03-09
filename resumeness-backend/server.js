const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const { coverletterRouter } = require("./routers/coverletterRouter");
const { resumeRouter } = require("./routers/resumeRouter");
const { authRouter } = require("./routers/authRouter");
const cors = require('cors');

dotenv.config({path: './.env'});

const app = express();


app.use(express.urlencoded({extended:true}));
app.use(express.json({limit: '5mb'}));
app.use(cors({origin : "http://localhost:3000"}));

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.CONNECTION_STRING).then(() => {console.log('Connected to database')})
.catch((err) => {console.error(err);});

app.use('/auth', authRouter);
app.use('/resume', resumeRouter);
app.use('/coverletter', coverletterRouter);

app.listen(PORT, (err) => {
    if(err) {console.log(error);}
    else {
        console.log(`Connected to server. Listening at port ${PORT}`);
    }
})