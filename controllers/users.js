const User = require('../model/user.model');

module.exports.register = async (req, res, next) => {
   
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username, password });
        // automatically added salt and hashed password in the object
        const registeredUser = await User.register(user, password);
           console.log("Register user: ")
         console.dir(registeredUser)
        req.login(registeredUser, err => {
            if (err) return next(err);
            res.status(200).send({
                messsage: 'register success',
                user: registeredUser
            });
        })
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
        res.status(404).send('register error');
    }
}

// router.post('/login', function(req, res) {
      
//     Users=new User({email: req.body.email, username : req.body.username});
  
//     User.register(Users, req.body.password, function(err, user) {
//     if (err) {
//         res.json({success:false, message:"Your account could not be saved. Error: ", err}) 
//     }else{
//         res.json({success: true, message: "Your account has been saved"})
//     }
//     });
// });

module.exports.login = (req, res) => {
    // const redirectUrl = req.session.returnTo || '/games';
    // delete req.session.returnTo;
    console.log("login in request body: ")
    
    console.log(req.user);
    res.status(200).send({ message: true });
}


module.exports.logout = (req, res) => {
    req.logout();
    // req.session.destroy();
    res.status(200).send({
        messsage: true
    });
}