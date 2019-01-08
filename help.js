const Discord = require('discord.js');
const fs = require('fs');
const r = require("../reactions.json");
let color = (0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)

module.exports.code = async (client, message, args) => {
    let prefix = client.server.get(message.guild.id, "prefix")
    let page1 = new Discord.RichEmbed()
    .setTitle(`**Commands List\nPage 1/2\nPrefix: ${prefix}**`)
    .setColor(color)
    .setTimestamp()
    .setFooter(`Help Message | Requested By ${message.author.username} | Page 1`, message.author.avatarURL)
    .addField(`Help`, `${prefix}help = sends this help message`)
    .addField(`Bal`, `${prefix}bal = gets your bank balance`)
    .addField(`Payday`, `${prefix}payday = its payday time 😉`)
    .addField(`Pay`, `${prefix}pay (@user) (amount) = give some of your own cash to another person`)
    .addField(`Slots`, `${prefix}slots (bet amount) = play the slots machine at your own risk...`)
    .addField(`Shop`, `${prefix}shop = buy items from the store using the currency (will be updated with more soon)`)

    let page2 = new Discord.RichEmbed()
    .setTitle(`**Commands List\nPage 2/2\nPrefix: ${prefix}**`)
    .setColor(color)
    .setTimestamp()
    .setFooter(`Help Message | Requested By ${message.author.username} | Page 2`, message.author.avatarURL)
    .addField("Dice", `${prefix}dice (guess) (bet) = roll a dice and guess which side it will be`)
    .addField("RNG", `${prefix}rng (bet) (max number) = generates a random number between a specified max and 1, if you guess it you get a bet multiplier based on how big the max was`)
    .addField("Invite", `${prefix}invite = sends an invite link if you want to add the bot to your own server :D`)
    .addField("Coinflip", `${prefix}coinflip (heads or tails) (bet) = flips a coin and if you guess it right you win`)
    .addField(`Prefix`, `${prefix}prefix (new prefix) = changes the server's prefix`)
    .addField(`Stats`, `${prefix}stats = view my current stats!`)

    message.channel.send(page1)
    .then(async function (message) {
        let collector = message.createReactionCollector((reaction, user) => user !== client.user);
            setTimeout(function () {
                message.react(r.rewind);
            }, 400);
            setTimeout(function () {
                message.react(r.back);
            }, 800);
            setTimeout(function () {
                message.react(r.trash);
            }, 1200);
            setTimeout(function () {
                message.react(r.next);
            }, 1600);
            setTimeout(function() {
                message.react(r.fastforward)
            }, 2000);

        let pages = [
            page1,
            page2
        ]
        let page = 0;
        collector.on('collect', async (messageReaction) => {
            let deleteFilter = messageReaction.users.filter(mauthor => mauthor !== message.author);
            let notbot = messageReaction.users.filter(clientuser => clientuser !== client.user).first();
            let bot = messageReaction.users.filter(clientuser => clientuser === client.user).first();
            if(messageReaction.emoji.name === r.next) page++;
            if(messageReaction.emoji.name === r.back) page--;
            if(messageReaction.emoji.name === r.rewind) page = 0;
            if(messageReaction.emoji.name === r.fastforward) page = 1;
            if(page < 0) messageReaction.remove(notbot)
            if(page < 0) page = 0
            if(page > 1) messageReaction.remove(notbot)
            if(page > 1) page = 1
            if(messageReaction.emoji.name === r.back){
                //await messageReaction.remove(notbot)
                message.edit(pages[page])
            }else if(messageReaction.emoji.name === r.next){
                //await messageReaction.remove(notbot)
                message.edit(pages[page])
                return;
            }else if(messageReaction.emoji.name === r.fastforward){
                //await messageReaction.remove(notbot)
                message.edit(pages[page])
                return;
            }else if(messageReaction.emoji.name === r.rewind){
                //await messageReaction.remove(notbot);
                message.edit(pages[page])
                return;
            }else if(messageReaction.emoji.name === r.trash){
                //await messageReaction.remove(notbot);
                message.delete();
                collector.stop();
                return;
            }
        });
        setTimeout(function (){
            collector.stop();
        }, 60000);
});
}

module.exports.info = {
  name: "help",
  description: "sends this help message"
}
