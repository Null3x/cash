const Discord = require('discord.js');
const fs = require('fs');

module.exports.code = async (client, message, args) => {
    const key = `${message.author.id}-${message.guild.id}`;
    let pUser = message.mentions.members.first()
    if(!pUser) return message.channel.send("Yo m9 I can't pay that guy when I can't find him ya know...");
    let cashToSend = parseFloat(args[1]);
    if(!cashToSend) return message.channel.send("You must specify an amount of money to send!")
    if(isNaN(cashToSend)) return message.channel.send("You must specify a number to send!")
    if(cashToSend < 1) return message.channel.send(`You gotta pay him money dude...`)
    const pKey = `${pUser.id}-${message.guild.id}`
    if(client.money.get(key, "balance") < cashToSend) return message.channel.send("You do not have the money required to pay that much!");

    client.money.math(key, "-", cashToSend, "balance");
    client.money.math(pKey, "+", cashToSend, "balance");
    let successEmbed = new Discord.RichEmbed()
    .setTitle("SUCCESS!!")
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(`${message.member.displayName} >> ${pUser.displayName} | Pay $${cashToSend.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`, message.author.avatarURL)
    .addField(`${message.member.displayName} successfully paid ${pUser.displayName} $${cashToSend.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}!`, `${message.member.displayName}'s new balance: ${client.money.get(key, "balance").toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}\n${pUser.displayName}'s new balance: ${client.money.get(pKey, "balance").toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`)
    message.channel.send(successEmbed)
}

module.exports.info = {
  name: "pay"
}
