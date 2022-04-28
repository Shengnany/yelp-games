const Game = require('../model/game.model');


module.exports.index = async (req, res) => {
    const games = await Game.find({});
    console.log("In index"+games[0])
    return  res.status(200).send(games);
}



module.exports.createGame = async (req, res, next) => {
    const game = new Game(req.body.game);
    // game.author = req.user._id;
    console.log("In post" + game);
    await game.save();
    return res.status(201).send(game);
}

module.exports.showGame = async (req, res,) => {
    // const game = await Game.findById(req.params.id).populate({
    //     path: 'reviews',
    //     populate: {
    //         path: 'author'
    //     }
    // }).populate('author');
    const game = await Game.findById(req.params.id).populate('reviews');
    if (!game) {
        return res.status(404).send("Name not exists");
    }
      res.status(200).send({
         game:game
     });
}



module.exports.updateGame = async (req, res) => {
    const { id } = req.params;
    console.dir(req);
    const game = await Game.findByIdAndUpdate(id, { ...req.body });
    await game.save();
    console.log("In update" + {game});
    if (!game) {
        return res.status(404).send("Game does not exist");
    }
    res.status(200).send({
         game:game
     });
}

module.exports.deleteGame = async (req, res) => {
    const { id } = req.params;
    const game = await Game.findByIdAndDelete(id);
       if (!game) {
        return res.status(404).send("Game does not exist");
       }
    console.log("In delete" + game);
     res.status(200).send(game);
}