const discord = require('discord.js');
const {Client, RichEmbed, MessageReaction,MessageAttachment, Message, Discord, MessageEmbed, User, ClientUser, MessageMentions, GuildMember, Guild, GuildMemberManager, MessageManager, VoiceConnection} = require('discord.js');
const { Mongoose } = require('mongoose');
const db = new Map();
const moongoose = require('mongoose');
db.set('BWD3TT','7700');
db.set('BWD3FMR','9699');
db.set('ET122','999');
db.set('TS2080-B5','1599');
db.set('BXFP4001IN','3999');
db.set('B237 DUMMY','500');
db.set('SOLAR+1000','499');
db.set('DURO314','499');
db.set('B237','1199');
db.set('B - 222','1199');
db.set('B-101','1250');
db.set('B-115','1550');
db.set('FLORA DLX','1699');
db.set('B-117','2950');
db.set('ACER BAG','500');
db.set('X3 BT E-PH','1050');
db.set('AIRTEL 599','99');
db.set('AIRTEL2380','2000');
db.set('AIRTEL3999','3499');
db.set('T32S-DB18M','9990');
db.set('T32DNI32SV','11990');
db.set('55UDT55V','29990');
db.set('ECHO','7999');
db.set('ECHO P 2ND','12999');
db.set('FIRE TV','3499');
db.set('FIRETV D','3990');
db.set('ECHODOT D','2250');
db.set('BASIC DEMO','3000');
db.set('PAPERWHT D','5500');
db.set('ECHO D','9999');
db.set('MERCURY 01','15500');
db.set('MERCURY 04','5500');
db.set('MAJ DX-4','500');
db.set('MAJ MX4','940');
db.set('MAJESTY JE','2000');
db.set('3L4.5K MAG','3290');
db.set('CGX3','3600');
db.set('3W12LA','18500');
db.set('3W18GA','23500');
db.set('5CNHW12P-O','27500');
db.set('3CNHW18W-O','990');
db.set('3CNHW18H-O','29000');
db.set('318RBTU-O','29000');
db.set('5CNHW','3000');
db.set('3CNHW18H-I','3000');
db.set('3CNHW18R-I','3000');
db.set('3CNHW18W-I','3000');
db.set('318RBTU-I','3000');
db.set('312RBTU-D','5000');
db.set('12PAFU DMY','5000');
db.set('3HW12VCTLV','10000');
db.set('3HW18VCTLV','10000');
db.set('3CNHW12LIV','10000');
db.set('3CNHW18LIV','10000');
const bot = new Client();
const PREFIX ='!';
const token = 'NzQzNDQ3NjQ5MzM1NzcxMTM3.XzUzlA.wuZumnnO1SUhM_gGCWz8CzMKD94';
bot.on('ready', () =>{
    console.log("The Bot is active and ready to go");
});
bot.on("message", async message =>{
    let args = message.content.substring(PREFIX.length).split(" ");
    switch(args[0]){
        case 'bestprice':
            if(db.has(args[1])) {
                message.channel.send(`${db.get(args[1])} is the best price`);
            };
        break;
        case 'new-bestprice':
            db.set(args[1],args[2]);
        break;
        case 'edit-bestprice':
            if(db.has(args[1])) {
                db.delete(args[1]);
                db.set(args[1],args[2]);
            };
        break;
    };
});
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
bot.login(token);