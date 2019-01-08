const Discord = require('discord.js');
const fs = require('fs');
const enmap = require('enmap')

module.exports.code = async (client, message, args) => {
    let person = message.mentions.members.first()
    let uPerson = message.mentions.users.first()
    if(!person) person = message.member
    if(!uPerson) uPerson = message.author
  
    const key = `${uPerson.id}-${message.guild.id}`;

    let cashEmbed = new Discord.RichEmbed()
    .setTitle(`💰BALANCE💰`)
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(`${message.member.displayName} | Balance`, message.author.avatarURL)
    .addField(person.displayName + "'s Bank Balance", "$" + parseFloat(client.money.get(key, "balance")).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
    .addField(`${person.displayName}'s Win Multiplier`, `${client.multiplier.get(key, "multiplier")}x`)

    message.channel.send(cashEmbed)
}

module.exports.info = {
  name: "bal",
  description: "checks your bank balance"
}