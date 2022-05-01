const User = require('../model/user.model');
const bcrypt = require('bcryptjs');

// module.exports.register = async (req, res, next) => {
   
//     try {        
//         const { email, username, password } = req.body;
//            const user = new User({
//                     email:email,
//                     username: username,
//                     password: password
//            });
        
//         const savedUser = await user.save();
//         req.session.user_id = savedUser._id;
//          console.log("req.session.user_id")

//           req.session.save();
//                   console.log(req.session)
//         next();
//     //         Users=new User({email: req.body.email, username : req.body.username});
  
//     // User.register(Users, req.body.password, function(err, user) {
//     // if (err) {
//     //     res.json({success:false, message:"Your account could not be saved. Error: ", err}) 
//     // }else{
//     //     res.json({success: true, message: "Your account has been saved"})
//     // }
//     // });
//     } catch (e) {
//          console.dir(e)
//         res.status(404).send('register error');
//     }
// }

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
    
    console.log(req.session.user_id);
    res.status(200).send({ message: true });
}


module.exports.logout = (req, res) => {
    // req.logout();
    req.session.destroy();
    // req.session.user_id = null;
    res.status(200).send({
        messsage: true
    });
}