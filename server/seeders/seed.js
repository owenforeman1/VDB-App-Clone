const db = require('../config/connection');
const { User, GameList } = require('../models');
const userSeeds = require('./userSeeds.json');
const listSeeds = require('./listSeeds.json');

db.once('open', async () => {
    try {
       await User.deleteMany({});
       await GameList.deleteMany({});

       await User.create(userSeeds);

       for (let i = 0; i < listSeeds.length; i++) {
           await GameList.create(listSeeds[i]);
           await User.findOneAndUpdate(
               {[i]},
               {
                   $addToSet: {
                       lists: _id,
                   },
               }
           );
       }
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('all done!')
    process.exit(0);
});