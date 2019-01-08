const Discord = require('discord.js');
const fs = require('fs');
const r = require('../reactions.json');

module.exports.code = async (client, message, args) => {
    const key = `${message.author.id}-${message.guild.id}`
    let shopEmbed = new Discord.RichEmbed()
    .setTitle("**SHOP**\nYour Balance: $" + client.money.get(key, "balance").toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter("Shop")
    .setDescription(`Do ${client.server.get(message.guild.id, "prefix")}buy (item id) to purchase an item!`)
    .addField(`1.5x Winnings Multiplier`, `Price: $1000\nID: 1`)
    .addField(`2x Winnings Multiplier`, `Price: $2500\nID: 2`)
    
    const mAuthor = message.author
    message.channel.send(shopEmbed)
   /*.then(async function (message) {
        let collector = message.createReactionCollector((reaction, user) => user !== client.user);
            setTimeout(function () {
                message.react(r.one);
            }, 400);
            setTimeout(function () {
                message.react(r.two);
            }, 800);
            setTimeout(function () {
                message.react(r.three);
            }, 1200);
            setTimeout(function () {
                message.react(r.four);
            }, 1600);
            setTimeout(function() {
                message.react(r.five)
            }, 2000);
      
          collector.on('collect', async (messageReaction) => {
            let notbot = messageReaction.users.filter(clientuser => clientuser !== client.user).first();
            if(messageReaction.emoji.name === r.one){
                await messageReaction.remove(notbot);
            }else if(messageReaction.emoji.name === r.two){
                await messageReaction.remove(notbot);
                if(messageReaction.user.id !== mAuthor.id) return;
                return;
            }else if(messageReaction.emoji.name === r.three){
                await messageReaction.remove(notbot);
                return;
            }else if(messageReaction.emoji.name === r.four){
                await messageReaction.remove(notbot);
                return;
            }else if(messageReaction.emoji.name === r.five){
                await messageReaction.remove(notbot);
                message.delete();
                collector.stop();
                return;
            }
        });
        setTimeout(function (){
            collector.stop();
        }, 60000);
    });*/
}

module.exports.info = {
  name: "shop"
}
