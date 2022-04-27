const Game = require('../model/game.model');


module.exports.index = async (req, res) => {
    const games = await Game.find({});
    res.status(200).send(games);
}



module.exports.createGame = async (req, res, next) => {
    const game = new Game(req.body.game);
    game.author = req.user._id;
    await game.save();
    console.log(game);
    return res.status(201).send(game);
}

module.exports.showGame = async (req, res,) => {
    const game = await Game.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!game) {
        return res.status(404).send("Name not exists");
    }
     return res.status(200).send(game);
}



module.exports.updateGame = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const game = await Game.findByIdAndUpdate(id, { ...req.body.game });
    await game.save();
    if (!game) {
        return res.status(404).send("Game does not exist");
    }
    return res.status(200).send(game);
}

module.exports.deleteGame = async (req, res) => {
    const { id } = req.params;
    const game = await Game.findByIdAndDelete(id);
       if (!game) {
        return res.status(404).send("Game does not exist");
    }
    return res.status(200).send(game);
}