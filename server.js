const express = require('express');
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
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
console.log(process.env);
mongoose.connect(mongooseEnpoint, {     
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false, 
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
    resave: true,
    saveUninitialized: true,
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

app.use(session(sessionConfig));
app.use(cookieParser());
// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
const corsUrls = (process.env.CORS_URLS || '*').split(',');
// corsUrls = ['http://example.com', 'https://example.com'] or ['*']

app.use(cors({
  origin: (origin, cb) => cb(null, corsUrls.includes('*') || corsUrls.includes(origin)),
  credentials: true,
}));


  app.use(morgan('tiny'));

// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'build')));
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
