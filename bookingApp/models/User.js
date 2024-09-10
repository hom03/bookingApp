import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String
    },
    phone_no:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    card_no:{
        type: String,
        required:true
    },
    card_date:{
        type: String,
        required: true
    },
    cvv:{
        type: Number,
        required: true
    }

})
const User = mongoose.model("User", UserSchema)
export default User;