const Discord = require('discord.js');
const fs = require('fs');

module.exports.code = async (client, message, args) => {
    const key = `${message.author.id}-${message.guild.id}`;
    let bet = parseFloat(args[1])
    if(!bet || isNaN(bet)) return message.channel.send("You gotta place a bet m8...")
    if(bet < 1) return message.channel.send("You gotta bet $1 or higher!");
    if(bet > 1000) return message.channel.send("The maximum bet in coinflip is 1000!");
    let guess = args[0]
    if(!guess) return message.channel.send("Please guess heads or tails!");
    if(!guess === "heads" && !guess === "tails") return message.channel.send("Please guess heads or tails!");

    let cf = Math.floor(Math.random() * 2);

    let coinSides = [
        "heads",
        "tails"
    ]

    let side = coinSides[cf]

    if(side === "heads" && guess === "heads"){
        let winM = 1.5
        let winnings1 = bet * winM
        let winnings = winnings1 * client.multiplier.get(key, "multiplier");
        let newTotal = client.money.get(key, "balance") + winnings - bet;
        let winEmbed = new Discord.RichEmbed()
        .setTitle(`YOU WON $${winnings}!!\nNew Total: ${newTotal}`)
        .setColor("RANDOM")
        .addField( `Conratulations!`, "You picked heads and the coin was heads!")
        .setTimestamp()
        .setFooter(`${message.member.displayName} | Coinflip`);

        message.channel.send(winEmbed)
        client.money.math(key, "+", winnings, "balance");
        client.money.math(key, "-", bet, "balance");
        client.money.set(key, message.author.tag, "tag");

        return;
    }else if(side === "tails" && guess === "tails"){
        let winM = 1.5
        let winnings1 = bet * winM
        let winnings = winnings1 * client.multiplier.get(key, "multiplier");
        let newTotalA = client.money.get(key, "balance") + winnings;
        let newTotal = newTotalA - bet;
        let winEmbed = new Discord.RichEmbed()
        .setTitle(`YOU WON $${winnings.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}!!\nNew Total: ${newTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`)
        .setColor("RANDOM")
        .addField( `Conratulations!`, `You picked tails and the coin was tails!`)
        .setTimestamp()
        .setFooter(`${message.member.displayName} | Coinflip`);

        message.channel.send(winEmbed)
        client.money.math(key, "-", bet, "balance")
        client.money.math(key, "+", winnings, "balance")
        client.money.set(key, message.author.tag, "tag");

        return;
    }
    let newTotal = client.money.get(key, "balance") - bet;
    let winEmbed = new Discord.RichEmbed()
    .setTitle(`You lost $${bet} :(\nNew Total: ${newTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`)
    .setColor("RANDOM")
    .addField( `Sorry`, `You picked ${guess} and the coin was ${side}!`)
    .setTimestamp()
    .setFooter(`${message.member.displayName} | Coinflip`);

    message.channel.send(winEmbed)
    client.money.math(key, "-", bet, "balance")

    return;

}

module.exports.info = {
  name: "coinflip"
}
