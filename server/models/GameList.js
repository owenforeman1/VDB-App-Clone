const { Schema, Types } = require("mongoose");

const gameListSchema = new Schema({
  games: [{
    type: Schema.Types.ObjectId,
    ref: "Game",
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  listName: {
    type: String,
    required: true,
  },
});

const GameList = model("GameList", gameListSchema);

module.exports = GameList;