const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
  slug: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  released: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const Game = model("Game", gameSchema);

module.exports = Game;
