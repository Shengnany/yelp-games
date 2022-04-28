const express = require('express');
const router = express.Router();

const games = require('../controllers/games');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateGame } = require('./middleware');
// const multer = require('multer');
// const { storage } = require('../cloudinary');
// const upload = multer({ storage });


router.route('/')
    .get(catchAsync(games.index))
    .post(isLoggedIn, validateGame, catchAsync(games.createGame))
// router.route('/')
//     .get(catchAsync(games.index))
//     .post(catchAsync(games.createGame))


router.route('/:id')
    .get(catchAsync(games.showGame))
    .put(isLoggedIn, isAuthor, validateGame, catchAsync(games.updateGame))
    .delete(isLoggedIn, isAuthor, catchAsync(games.deleteGame));
// router.route('/:id')
// .get(catchAsync(games.showGame))
// .put(catchAsync(games.updateGame))
// .delete(catchAsync(games.deleteGame));



module.exports = router;