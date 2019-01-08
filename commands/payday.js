const Discord = require('discord.js');
const fs = require('fs');
const talkedRecently = new Set();

module.exports.code = async (client, message, args) => {
    const key = `${message.author.id}-${message.guild.id}`;
    
    if (talkedRecently.has(`${message.author.id}-${message.guild.id}`)) {
        message.channel.send("Wait 5 minutes before getting typing this again.");
    } else {

    let cashAmount = Math.floor(Math.random() * (50 - 10) + 10);
    let newTotal = client.money.get(key, "balance")
    let added = cashAmount + newTotal;

    client.money.set(key, added, "balance")

    message.channel.send(`You just earned $${cashAmount}! You are now at a total of $${client.money.get(key, "balance").toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}!`)

    talkedRecently.add(`${message.author.id}-${message.guild.id}`);
    setTimeout(() => {
      talkedRecently.delete(`${message.author.id}-${message.guild.id}`);
    }, 300000);
}
}

module.exports.info = {
  name: "payday",
  description: "gives you a random amount of money between 10 and 100"
}
