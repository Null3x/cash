const Discord = require('discord.js');
const fs = require('fs');

module.exports.code = async (client, message, args) => {
    const key = `${message.author.id}-${message.guild.id}`;
    let bet = parseFloat(args[1]);
    if(!bet) return message.channel.send("You must specify an amount of money to bet!")
    if(isNaN(bet)) return message.channel.send("You must specify a number as your bet!")
    if(client.money.get(key, "balance") <= bet - 1) return message.channel.send("You do not have the money required to bet that much!");
    let guess = parseFloat(args[0]);
    if(!bet) return message.channel.send("You must specify a number to guess!");
    if(isNaN(guess)) return message.channel.send("You must specify a number as your guess!");
    if(guess > 6) return message.channel.send("Dude this is a dice. Max u can guess is 6");
    if(guess < 1) return message.channel.send("There are 6 sides to a dice m8! Gotta guess one of them!");
    if(bet < 1) return message.channel.send("Yo dude uhhhhh what you tryna do?")

    let side1 = "http://www.clker.com/cliparts/X/w/P/Y/q/H/dice-1-md.png"
    let side2 = "http://www.clker.com/cliparts/a/Y/E/o/z/t/dice-2-md.png"
    let side3 = "http://www.clker.com/cliparts/8/u/t/L/K/e/dice-3-md.png"
    let side4 = "http://www.clker.com/cliparts/r/z/d/a/L/V/dice-4-md.png"
    let side5 = "http://www.clker.com/cliparts/e/y/7/h/W/K/dice-5-md.png"
    let side6 = "http://www.clker.com/cliparts/Y/g/8/e/o/9/dice-6-hi.png"

    let sides = [
        side1,
        side2,
        side3,
        side4,
        side5,
        side6
    ];

    guess--;

    let side = Math.floor(Math.random() * sides.length);
    if(side == guess){
        let winM = Math.floor(Math.random() * (10 - 2) + 2);
        let winnings1 = bet * winM
        let winnings = winnings1 * client.multiplier.get(key, "multiplier");
        let newTotal = client.money.get(key, "balance") + winnings - bet;
        let winEmbed = new Discord.RichEmbed()
        .setImage(sides[side])
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(`${message.member.displayName} | Dice Roll`, message.author.avatarURL)
        .setTitle(`YOU WON $${winnings.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}!!\nNew Total: $${newTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`);
        message.channel.send(winEmbed)
        client.money.math(key, "-", bet, "balance")
        client.money.math(key, "+", winnings, "balance")
        client.money.set(key, message.author.tag, "tag");
        return;
    }
    let newTotal = client.money.get(key, "balance") - bet;
    let loseEmbed = new Discord.RichEmbed()
    .setImage(sides[side])
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(`${message.member.displayName} | Dice Roll`)
    .setTitle(`You Lost $${bet.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} :(\nNew Amount: $${newTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`);
    message.channel.send(loseEmbed)
    client.money.math(key, "-", bet, "balance")
    client.money.set(key, message.author.tag, "tag");
} 

module.exports.info = {
  name: "dice"
}
