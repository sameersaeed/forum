const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')
const bodyparser = require("body-parser")
const path = require('path');
const { response } = require('express');
const connectDB = require('./server/database/connection');
const authRoute = require('./server/routes/user_auth_router')
const app = express();
const PORT = process.env.PORT || 8080
const cors = require("cors");
dotenv.config({ path: 'config.env' })
const corsSettings ={
    origin: '*', 
    credentials: true,        
    optionSuccessStatus: 200,
 }
 
app.use(cors(corsSettings))
app.use(morgan('tiny')); //logging reqs
connectDB(); //connecting to mongoDB
app.use(bodyparser.urlencoded({ extended: true })) //parsing reqs to body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs") //setting view engine

//loading assets
app.use('/pr', require('./server/routes/posts_router'))
app.use('/home', require('./server/routes/user_auth_router'))
app.use('/css', express.static(path.resolve(__dirname, "assets/css"))) 
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

app.listen(3000, () => { console.log(`server running on http://localhost:${PORT}`)})