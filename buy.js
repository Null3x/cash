const Discord = require('discord.js');
const fs = require('fs');
const enmap = require('enmap')

module.exports.code = async (client, message, args) => {
    const key = `${message.author.id}-${message.guild.id}`;
    let itemid = parseFloat(args[0]);
    if(!itemid) return message.channel.send(`You must specify an item ID! Do ${client.server.get(message.guild.id, "prefix")}shop to see all the possible items and their ID's!`)

    if(itemid === 1){
        if(parseFloat(client.money.get(key, "balance")) < 1000) return message.channel.send("You do not have the required balance to purchase this item!");
        if(client.multiplier.get(key, "multiplier") >= 1.5) return message.channel.send("You already have a multiplier greater than or equal to the one you are purchasing!");

        client.multiplier.set(key, 1.5, "multiplier")
        client.money.math(key, '-', 1000, "balance")
        message.channel.send("Your winnings multiplier has increased to 1.5x! Enjoy!")
    }else if(itemid === 2){
        if(parseFloat(client.money.get(key, "balance")) < 2500) return message.channel.send("You do not have the required balance to purchase this item!");
        if(client.multiplier.get(key, "multiplier") >= 2) return message.channel.send("You already have a multiplier greater than or equal to the one you are purchasing!");

        client.multiplier.set(key, 2, "multiplier")
        client.money.math(key, '-', 2500, "balance")
        message.channel.send("Your winnings multiplier has increased to 2x! Enjoy!")
    }else{
        message.channel.send(`Invalid Item ID! Please refer to ${client.server.get(message.guild.id, "prefix")}shop to view all item ID's!`)
    }
}

module.exports.info = {
  name: "buy"
}
