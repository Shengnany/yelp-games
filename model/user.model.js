
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
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

// const mongoose = require('mongoose');
// const crypto = require('crypto');
// const jwt = require('jsonwebtoken');

// const { Schema } = mongoose;

// const UserSchema = new mongoose.Schema({
//     email:String,
// 	username: {
// 		type: String,
// 		required: true
// 	},
// 	password: {
// 		type: String,
// 		required: true
// 	}
// });


// module.exports =  mongoose.model('Users', UserSchema);

//userSchema.pre('save', async function (next) {
// 	console.log("Pre save1")
//     if (!this.isModified('password')) return next();
// 	// this.password = await bcrypt.hash(this.password, 12);
// 	console.log("Pre save2")
//     this.password = await bcrypt.hash(this.password, 1);
//     next();
	
// })

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be blank']
    },
    password: {
        type: String,
        required: [true, 'Password cannot be blank']
	},
	    email: {
        type: String,
        required: [true, 'Email cannot be blank']
    }
})

userSchema.statics.findAndValidate = async function (username, password) {
    const foundUser = await this.findOne({ username });
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
}

userSchema.pre('save',  async function (next) {
    // if (!this.isModified('password')) return next();
	// this.password = await bcrypt.hash(this.password, 2);
	bcrypt.hash(this.password, 2)
		.then(function (hash) {
    		// Store hash in your password DB.
			this.password = hash;
		})
		.catch((e) => console.dir(e));
    next();
})

//   bcrypt.genSalt(10,   function (err, salt) {
//             if (err) return next(err);
//             bcrypt.hashSync(password, salt,  function (err, hash) {
//                 if (err) return next(err);
                
             
                
//                 console.log("saved: "+ savedUser)
//             });
//         });



module.exports = mongoose.model('User', userSchema);