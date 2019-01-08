const Discord = require('discord.js');
const fs = require('fs');

module.exports.code = async (client, message, args) => {
    const key = `${message.author.id}-${message.guild.id}`
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You do not have the permissions to do this!");

    let mToAdd = message.mentions.members.first()
    if(!mToAdd) return message.channel.send("You didn't specify a user!");
    const pKey = `${mToAdd.id}-${message.guild.id}`
    let cashtogive = args[1]
    if(!cashtogive) return message.channel.send("You must specify an amount to take!")

    if(cashtogive === "all"){
        message.channel.send(`Took all ${mToAdd.displayName}'s cash successfully!`);

        client.money.math(pKey, "-", client.money.get(pKey, "balance"), "balance");

        return;
    }

    let cashToGive = parseFloat(cashtogive)

    if(!cashToGive) return message.channel.send("You need to specify an amount to take!")

    client.money.math(pKey, "-", cashToGive, "balance");

    message.channel.send(`Took $${cashToGive.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} from ${mToAdd.displayName} successfully!`);
}

module.exports.info = {
  name: "take"
}
