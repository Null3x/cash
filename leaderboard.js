const Discord = require('discord.js');
 
module.exports.code = async (client, message, args) => {
    const filtered = client.money.filter( p => p.serverid === message.guild.id ).array();

    const sorted = filtered.sort((a, b) => b.balance - a.balance);
  
    const top10 = sorted.splice(0, 10);
  
    const embed = new Discord.RichEmbed()
      .setTitle("Leaderboard")
      .setColor("RANDOM")
      .setFooter(`${message.member.displayName} | Leaderboard`, message.author.avatarURL)
      .setTimestamp();

    let a = 0
    for(const data of top10) {
      a++;
      embed.addField(`${a}.`, `${data.tag} - $${parseFloat(data.balance).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`);
    }
    return message.channel.send({embed});
}

module.exports.info = {
    name: "leaderboard"
}