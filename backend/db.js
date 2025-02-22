// for createing schema and model of a user in mongoose
const dotenv = require("dotenv")
dotenv.config()
const mongoose = require("mongoose")
const {Schema} = mongoose;
// console.log(process.env.MONGO_URI)
mongoose.connect(`${process.env.MONGO_URI}`)

//creating a  schema for user

// basic level

// const userSchema = new Schema({
//     username:String,
//     password:String,
//     firstname:String,
//     lastname:String,
// })

// advance level

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    password:{
        type:String,
        required:true,
        minLength:7
    },
    firstname:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    }
    
})

// creating model
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});
const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);


module.exports = {
	User,
    Account
};