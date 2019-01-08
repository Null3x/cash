const Discord = require('discord.js');
const fs = require('fs');

module.exports.code = async (client, message, args) => {
    const key = `${message.author.id}-${message.guild.id}`
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You do not have the permissions to do this!");

    let mToAdd = message.mentions.members.first()
    if(!mToAdd) return message.channel.send("You didn't specify a user!");
    const pKey = `${mToAdd.id}-${message.guild.id}`
    let cashToGive = parseFloat(args[1]);
    if(!cashToGive) return message.channel.send("You need to specify an amount to give!")

    client.money.math(pKey, "+", cashToGive, "balance");

    message.channel.send(`Gave ${mToAdd.displayName} $${cashToGive.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} successfully!`);
}

module.exports.info = {
  name: "give"
}
