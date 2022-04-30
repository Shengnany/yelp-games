const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../model/user.model');
const users = require('../controllers/users');
const { doLogin, checkauth } = require('./middleware');

const bcrypt			= require('bcryptjs');

router.post('/login', passport.authenticate('local', {

}),users.login);



router.post('/register', async (req, res) => {
    const {username, password,email} = req.body;
	// const exists = await User.exists({ username: username });

	// if (exists) {
    //     res.status(200).send({
    //         message:true
    //     })
	// };

	bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err);
		bcrypt.hash(password, salt, function (err, hash) {
			if (err) return next(err);
			
            const user = new User({
                email:email,
                username: username,
                password: hash
            });

			user.save();
            console.log("saved: "+user)
			 res.status(200).send({
                     message:true
                })              
		});
	});
});

router.post('/logout', users.logout)

module.exports = router;