const Discord = require('discord.js');
const fs = require('fs');

module.exports.code = async (client, message, args) => {
  let inv = new Discord.RichEmbed()
    .setTitle("Invite Me :D")
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(`${message.member.displayName} | Invite`, message.author.avatarURL)
    .addField("Invite Me At This Link!", `https://bit.ly/2QZPtIk`);

    message.channel.send(inv)
}

module.exports.info = {
  name: "invite"
}
