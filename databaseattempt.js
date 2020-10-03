
const { Mongoose } = require('mongoose');
const moongoose = require('mongoose');
const reqstring = {    type: String,
    required: true,
};
const profileschema =  mongoose.Schema({
    guildid: reqstring,
    userid: reqstring,
    xp: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1,
    }
});
module.exports = moongoose.model('profile',profileschema);
