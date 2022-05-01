const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../model/user.model');
const users = require('../controllers/users');
const { doLogin, checkauth } = require('./middleware');

const bcrypt			= require('bcryptjs');

// router.post('/login', passport.authenticate('local', {

// }),users.login);

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if (foundUser) {
        req.session.user_id = foundUser._id;
        res.status(200).send(foundUser)
        console.log("logged in")
        next();
    }
    else {
        res.status(404).send({
                    message:false
            }) 
    }
},users.login)


router.post('/register', async (req, res) => {
  try {        
        const { email, username, password } = req.body;
           const user = new User({
                    email:email,
                    username: username,
                    password: password
           });
        
          savedUser = await user.save();
        req.session.user_id = savedUser._id;
     console.log("req.session.user_id")

          req.session.save();
      console.log(req.session)
          console.log("post handler1")
    // const user = new User({ username, password,email })
    // await user.save();
    console.log("post handler2")	
    
    return res.status(201).send( savedUser );
    //         Users=new User({email: req.body.email, username : req.body.username});
  
    // User.register(Users, req.body.password, function(err, user) {
    // if (err) {
    //     res.json({success:false, message:"Your account could not be saved. Error: ", err}) 
    // }else{
    //     res.json({success: true, message: "Your account has been saved"})
    // }
    // });
    } catch (e) {
         console.dir(e)
        return res.status(404).send('register error');
    }

});

router.post('/logout', users.logout)

module.exports = router;