const Discord = require("discord.js")

module.exports.code = async (client, message, args) => {
	 let embed = new Discord.RichEmbed()
	  .setTitle("My Stats!")
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(`CA$H's Stats`)
	  .addField("Total Servers", client.guilds.size)
	  .addField("Total Members", client.users.size)
	  .addField("Started At", `Friday December 28th 2018 at 4:23 PM EST`)
	  .addField("I was made by", `<@481326184274067456>`);

	  message.author.send(embed)
    message.channel.send(`Check your DM's!`)
}

module.exports.info = {
	name: "stats"
}