const Discord = require('discord.js');
const fs = require('fs');

module.exports.code = async (client, message, args) => {
    const key = `${message.author.id}-${message.guild.id}`;
    let bet = parseFloat(args[0]);
    if(!bet) return message.channel.send("You must specify an amount of money to bet!")
    if(isNaN(bet)) return message.channel.send("You must specify a number as your bet!")
    if(client.money.get(key, "balance") < bet) return message.channel.send("You do not have the money required to bet that much!");
    if(bet < 1) return message.channel.send("You cannot bet a number less than 1!")

    let slots = [
        "🧀",
        "🥝",
        "🍓",
        "🍌",
        "🍒",
        "🧀",
        "🥝"
    ];
    let t1;
    let t2;
    let t3;
    let t4;
    let t5;
    let m1 = Math.floor(Math.random() * (6 - 2) + 2);
    let m2 = Math.floor(Math.random() * (6 - 2) + 2);
    let m3 = Math.floor(Math.random() * (6 - 2) + 2);
    let m4 = Math.floor(Math.random() * (6 - 2) + 2);
    let m5 = Math.floor(Math.random() * (6 - 2) + 2);
    let b1;
    let b2;
    let b3;
    let b4;
    let b5;

    t1 = m1 + 1
    t2 = m2 + 1
    t3 = m3 + 1
    t4 = m4 + 1
    t5 = m5 + 1
    b1 = m1 - 1
    b2 = m2 - 1
    b3 = m3 - 1
    b4 = m4 - 1
    b5 = m5 - 1


    if(slots[m1] === slots[m2] && slots[m3] === slots[m2]){
        let winM = Math.floor(Math.random() * (10 - 2) + 2);
        let winnings1 = bet * winM
        let winnings = winnings1 * client.multiplier.get(key, "multiplier");
        let newTotal = client.money.get(key, "balance") + winnings - bet
        let winEmbed = new Discord.RichEmbed()
        .setTitle(`**You Won $${winnings.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}!**\nNew Balance: $${newTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(`${message.member.displayName} | Slots`, message.author.avatarURL)
        .setDescription(`${slots[t1]}${slots[t2]}${slots[t3]}\n${slots[m1]}${slots[m2]}${slots[m3]}\n${slots[b1]}${slots[b2]}${slots[b3]}`)

        message.channel.send(winEmbed)
        client.money.math(key, "-", bet, "balance")
        client.money.math(key, "+", winnings, "balance")
        return;
    }
    let newTotal = client.money.get(key, "balance") - bet;
    let loseEmbed = new Discord.RichEmbed()
    .setTitle(`**You Lost $${bet.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}**\nNew Balance: $${newTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`)
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(`${message.member.displayName} | Slots`, message.author.avatarURL)
    .setDescription(`${slots[t1]}${slots[t2]}${slots[t3]}\n${slots[m1]}${slots[m2]}${slots[m3]}\n${slots[b1]}${slots[b2]}${slots[b3]}`)

    message.channel.send(loseEmbed)
    client.money.math(key, "-", bet, "balance")
}

module.exports.info = {
  name: "slots",
  description: "spins a slot machine and if you win you get a random multiplier on your bet"
}
 