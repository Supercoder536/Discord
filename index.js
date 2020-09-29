
const {Client, RichEmbed, MessageReaction,MessageAttachment, Message, Discord, MessageEmbed, User, ClientUser, MessageMentions, GuildMember, Guild, GuildMemberManager, MessageManager, VoiceConnection} = require('discord.js');
const bot = new Client();
const { Schema} = require('mongoose');
const Canvacord = require('canvacord');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const canvacord = require('canvacord');
var currentlvl;
const PREFIX = "!";
const DBforlevels = new Map();
const mongoose = require('mongoose');
const connectiontoDB = async () =>{
    await mongoose.connect('mongodb://new_user30:1234@userinfo-shard-00-00.ra9wa.mongodb.net:27017,userinfo-shard-00-01.ra9wa.mongodb.net:27017,userinfo-shard-00-02.ra9wa.mongodb.net:27017/Rank?ssl=true&replicaSet=atlas-mdhm7e-shard-0&authSource=admin&retryWrites=true&w=majority',{useUnifiedTopology: true, useNewUrlParser: true});
    console.log('Connected to MongoDB web');
};
const reqstring = {
    type: String,
    required: true,
};
const profileschema = Schema({
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
bot.on('ready', () =>{
    console.log("The Bot is active and ready to go");
    bot.user.setActivity('!setup', {type: "PLAYING"});
    connectiontoDB();
});

bot.on("message", async message =>{
    let msg = message.content.toLowerCase();
    let args = msg.split(' ');
    const addxp = async (guildid, userid, xptoadd) => {
        connectiontoDB().then(async monkey =>{
            try {
                const result = await profileschema.findOneAndUpdate({
                    guildid,
                    userid
                },{
                    guildid,
                    userid,
                    $inc: {
                        xp: xptoadd
                    }
                },{
                    upsert: true,
                    new: true,
                })
                console.log(result);
            } finally {
                mongoose.connection.close();
            }
        })
    }
    addxp(message.guild.id,message.member.id, 23);
    switch(args[0]){
        case "poll":
           let msgArgs = args.slice(1).join(" ");
           const msgArgsembed = new MessageEmbed().setTitle(`Poll`).setDescription(msgArgs).setColor(15158332).setFooter(`Added by @${message.author.username}`);
           message.channel.send(msgArgsembed).then(MessageReaction =>{
               MessageReaction.react("👍");
               MessageReaction.react("👎");
           });
       break;
        case 'NewEmbed':
            const argssplitby = msg.split('-|-');
            var msgembed = new MessageEmbed().setColor(15158332).setTitle(argssplitby[1]).setDescription(argssplitby[2]);
            switch(argssplitby[3]){
                case 'red':
                    msgembed.setColor(15158332);
                break;
                case 'golden':
                    msgembed.setColor(15844367);
                break;
                case 'purple':
                    msgembed.setColor(10181046);
                break;
                case 'blue':
                    msgembed.setColor(3447003);
                break;
            };
            message.channel.send(msgembed);
        break;
        case 'setup':      
            const bigembed = new MessageEmbed().setColor(3447003).setTitle('Commands').addField('Polls','!poll to iniate a simple yes or no poll').addField('Embeds','!NewEmbed For a New Embed with a title followed by a description followed by a color').addField('Colors', 'There are only a few colors for embeds and to find out more !colors').addField('Yeet','!Yeet to yeet or be yeeted').addField('Slap','!slap followed by the members name to slap them').addField('Hug','!hug followed by a members name to hug them',true).addField('Music','!play to play a song and !stop to stop one').setFooter(`Added by ${message.author.tag}`,message.author.avatarURL());
            message.channel.send(bigembed).then(sent => {
                sent.awaitReactions({ max: 1, time: 60000})
                .then(collected => {
                    const reaction = collected.first();
            
                    if (reaction.emoji.name === '👍') {
                        message.reply('Thumbs Up Reaction');
                    };
                });
            });
        break;
        case 'colors':
            const blue = new MessageEmbed().setColor(3447003).setTitle('Blue').setDescription('Activated By blue');
            const red = new MessageEmbed().setColor(15158332).setTitle('Red').setDescription('Activated By red');
            const golden = new MessageEmbed().setColor(15844367).setTitle('Golden').setDescription('Activated By golden');
            const purple = new MessageEmbed().setColor(10181046).setTitle('Purple').setDescription('Activated By purple');
            message.channel.send(blue);
            message.channel.send(red);
            message.channel.send(golden);
            message.channel.send(purple);
        break;
        case 'Yeet':
            const yeet = new MessageAttachment('./yeet.png');
            message.channel.send(yeet);
        break;
        case 'join':
            message.member.voice.channel.join();
        break;
        case 'play':
            const query = args.slice(1).join(" ");
            const res = await ytsr(query).catch(e => {
                return message.channel.send('No Results Found!');
            });
            const video = res.items.filter(i => i.type === 'video')[0];
            const url = video.link;
            const voicechannel = message.member.voice.channel;
            if(!voicechannel) return message.channel.send(`You need to be in a voice channel for this feature to work`);
            const permissions = voicechannel.permissionsFor(message.client.user);
            if(!permissions.has('CONNECT')) return message.channel.send('I do not have the correct permissions');
            if(!permissions.has('SPEAK')) return message.channel.send('I do not have the correct permissions');
            try {
                var connection = await voicechannel.join(15158332);
            } catch (error) {
                console.error(error);
            return;
            }
            
            const stream = ytdl(`${url}`, {filter : 'audioonly'});
            const embed1212 = new MessageEmbed().setTitle(`Now Playing`).setDescription(`${video.title}`).setColor().setURL(`${url}`).setFooter(`Added by ${message.author.tag}`,message.author.avatarURL());
            message.channel.send(embed1212);
            const dispatcher = connection.play(stream)
            dispatcher.on('end', () =>{
                message.channel.send('Song Ended')
                voicechannel.leave()
            });
            dispatcher.setVolumeLogarithmic(5 / 5);
        break;
        case 'stop':
            if(!message.member.voice.channel) return message.channel.send('You need to be in a voice channel to stop playing');
            message.member.voice.channel.leave();
        break;
        case 'hug':
            var mentionedmember = message.mentions.members.first();
            message.channel.send(`@${message.author.username} hugged @${mentionedmember}`);
        break;
        case 'slap':
            var mentionedmember = message.mentions.members.first();
            message.channel.send(`@${message.author.username} slapped ${mentionedmember}`);
        break;
        case 'membercount':
            var Myguild = bot.guilds.fetch(message.guild.id);
            var membercount = (await Myguild).memberCount;
            message.channel.send(membercount);
        break;
        case 'rank':
            if(!DBforlevels.get(`${message.guild.id}.${message.author.id}`)){
                message.reply('No XP gained yet or this an error!');
            } else {
                const card = await canvacord.rank({
                    username: message.author.username,
                    discrim: message.author.discriminator,
                    level: currentlvl,
                    rank: 1,
                    neededXP:  levelcheckmarks[currentlvl],
                    currentXP: DBforlevels.get(`${message.guild.id}.${message.author.id}`),
                    avatarURL: message.author.displayAvatarURL({format: 'jpg'}),
                    color: 'white',
                });
                const attachment = new MessageAttachment(card);
                message.channel.send(attachment);
            };
        break;
    };
});
bot.login(token);
