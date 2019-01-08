const Discord = require('discord.js');
const fs = require('fs');

module.exports.code = async (client, message, args) => {
  const key = `${message.author.id}-${message.guild.id}`
  const sKey = message.guild.id;

  if(!message.member.hasPermission("MANAGE_GUILD") && message.author.id != 481326184274067456) return message.channel.send("You do not have permission for this!");

  let newPrefix = args[0]

  client.server.set(sKey, newPrefix, "prefix");

  message.channel.send(`Prefix changed to ${newPrefix} successfully!`);
}

module.exports.info = {
  name: "prefix"
}
