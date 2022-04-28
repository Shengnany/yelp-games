const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const gameRouter = require('./routes/games');
const reviewRouter = require('./routes/reviews');

const mongooseEnpoint = process.env.DB_URL || 'mongodb://localhost:27017/yelpgames_app';

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


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: '*',
}));
app.use(morgan('tiny'))
// app.use(methodOverride('_method'));
// app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.static(path.join(__dirname, 'build')));
// app.use(mongoSanitize({
//     replaceWith: '_'
// }))


// app.use(auth_middleware);

app.use('/games', gameRouter);
app.use('/games/:id/reviews', reviewRouter);

// app.use('/', userRouter);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Starting server');
});
