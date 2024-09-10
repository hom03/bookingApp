import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import usersRoute from './routes/users.js';
const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs');

const connect = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO, {useNewUrlParser:true});
        console.log("Connected to mongoDB.")
    } catch (error) {
        throw error
    }
};


app.use('/public',express.static('public')); 

mongoose.connection.on("disconnected", ()=>{
    console.log("MongoDB disconnected.")
});

mongoose.connection.on("connected", ()=>{
    console.log("MongoDB connected.")
});

app.use(express.json())
app.use('/users', usersRoute);

app.get('/', (req,res)=>{
    res.render("index", {message : "Paintball Cork"})
});
app.get('/create',(req,res)=>{
    res.render("createBookings", {message: "Create Booking"})
});
app.get('/users/modify');
app.get('/users/del');
app.get('/about',(req,res)=>{
    res.render("about", {message: "About Paintball Cork"})
});
app.get('/help',(req,res)=>{
    res.render("help", {message: "Help Page"})
});
app.listen(8800, ()=>{
    connect()
    console.log("Connected to backend.");
});