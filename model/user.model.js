// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');

// const UserSchema = new Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//         username: {
//         type: String,
//         required: true,
//         unique: true,
//         },
//          password: {
//         type: String,
//         required: true,
//         unique: true
//     }
    
// });

// // add on password and username to our schema
// // make sure the un and pw are unique and other methods
// UserSchema.plugin(passportLocalMongoose);

// module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    email:String,
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});


module.exports =  mongoose.model('Users', UserSchema);