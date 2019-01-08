const Discord = require('discord.js');
const fs = require('fs');

module.exports.code = async (client, message, args) => {
    const filter = m => m.author.id === message.author.id
    const key = `${message.author.id}-${message.guild.id}`;
    let bet = parseFloat(args[0]);
    let max = parseFloat(args[1]);
    if(!bet) return message.channel.send("You must specify a bet!");
    if(bet < 1) return message.channel.send("You must bet a $1 or greater!");
    if(!max) return message.channel.send("You must specify a max number!");
    if(max < 2) return message.channel.send("Please specify a max that is 2 or greater!");
    let winMultiplier1 = max / 2.5
    let winMultiplier = Math.round(winMultiplier1)
    if(winMultiplier < 1) winMultiplier = 1.25
    max++;
    let rng = Math.floor(Math.random() * (max - 1) + 1);
    max--; 

    message.channel.send(`What is your guess at the number? The number is between ${max} and 1. If you win you get $${parseFloat(winMultiplier * bet).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}. Your chances are ${1/max * 100}%. You have 20 seconds`);
    message.channel.awaitMessages(filter, {max: 1, time: 20000}).then(collected => {
    let guessString = collected.first().content.split(".")
    let guess = parseFloat(guessString);

    if(guess === rng){
        let winnings1 = bet * winMultiplier
        let winnings = winnings1 * client.multiplier.get(key, "multiplier");
        let newTotal = client.money.get(key, "balance") + winnings - bet;

        let embed = new Discord.RichEmbed()
        .setTitle(`YOU WON $${winnings.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}!!\nNew Total: $${newTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`)
        .setColor("RANDOM")
        .addField("Congratulations!", `You choose ${guess} and the random number was ${rng}!`)
        .setTimestamp()
        .setFooter(`${message.member.displayName} | RNG`);

        message.channel.send(embed)
        client.money.math(key, "-", bet, "balance")
        client.money.math(key, "+", winnings, "balance")
        return;
    }
    let newTotal = client.money.get(key, "balance") - bet;

    let embed = new Discord.RichEmbed()
    .setTitle(`You lost $${bet.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} :(!!\nNew Total: $${newTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`)
    .setColor("RANDOM")
    .addField("Sorry :(", `You choose ${guess} and the random number was ${rng}...`)
    .setTimestamp()
    .setFooter(`${message.member.displayName} | RNG`);

    message.channel.send(embed)
    client.money.math(key, "-", bet, "balance")


    }).catch(err => {
        console.log(err)
    });
}

module.exports.info = {
  name: "rng"
}
 