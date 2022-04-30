const express = require('express');

const User = require('./model/user.model');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const gameRouter = require('./routes/games');
const reviewRouter = require('./routes/reviews');
const userRouter = require('./routes/users');
const crypto = require('crypto')
const passport = require('passport');
const session = require('express-session');
const MongoDBStore = require("connect-mongo");
const mongooseEnpoint = process.env.DB_URL || 'mongodb://localhost:27017/yelpgames_app';
const secret = process.env.SECRET || 'thisshouldbeabettersecret!';

const localStrategy		= require('passport-local').Strategy;
const bcrypt			= require('bcryptjs');

mongoose.connect(mongooseEnpoint, {     
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false 
  useNewUrlParser: true,
  useUnifiedTopology: true 
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});



const store =  MongoDBStore.create({
    mongoUrl: mongooseEnpoint,
    secret,
    touchAfter: 24 * 60 * 60
});

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        // httpOnly: true,
        secure: false,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: '*',
}));

app.use(session(sessionConfig));
// Passport.js
app.use(passport.initialize());
app.use(passport.session());
// app.use(auth_middleware);

// initialize Passport
// app.use(passport.initialize());
// persistant login sessions
// app.use(passport.session());
// use the local strategy instead of github or other
// for the local strategy the authentication method is going to be located on the User model
// with the static methods added on
// passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

passport.use(new localStrategy(function (username, password, done) {
  User.findOne({ username: username }, function (err, user) {
    console.log(password);
    if (err)  {
      console.log("1: "+password);
       return done(err);
    }
		if (!user){
       console.log("2: "+password);
          return done(null, false, { message: 'Incorrect username.' });
    }


		bcrypt.compare(password, user.password, function (err, res) {
      if (err) {
         console.log("3:");
        return done(err);
      }
      if (res === false) {
                  console.log("4:");
        return done(null, false, { message: 'Incorrect password.' });
      }

			console.log("5:");
			return done(null, user);
		});
	});
}));


// passport.use(User.createStrategy());
// const crypto = require('crypto');
// passport.use(new LocalStrategy(function verify(username, password, cb) {
  
//   db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, user) {
//     if (err) { return cb(err); }
//     if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }

//     crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
//       if (err) { return cb(err); }
//       if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
//         return cb(null, false, { message: 'Incorrect username or password.' });
//       }
//       return cb(null, user);
//     });
//   });
// }));
// how to serialize user : how to store user in the session
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

  app.use(morgan('tiny'));

// app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.static(path.join(__dirname, 'build')));
// app.use(mongoSanitize({
//     replaceWith: '_'
// }))
app.use('/', userRouter);
app.use('/games', gameRouter);
app.use('/games/:id/reviews', reviewRouter);


app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Starting server');
});
