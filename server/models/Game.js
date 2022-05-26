const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
  slug: {
    type: String,
    // unique: true,
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
  rating: {
    type: String,
  },
  platforms: {
    type: String,
  },
  metacritic: {
    type: Number,
  }
});

const Game = model("Game", gameSchema);

module.exports = Game;
