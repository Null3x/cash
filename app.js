const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const { Client, RichEmbed } = require('discord.js');
const Discord = require('discord.js');
const client = new Client();
const fs = require("fs")
const enmap = require('enmap')
client.server = new enmap({name: "server"});
client.commands = new Discord.Collection();
client.money = new enmap({name: "money"});
client.multiplier = new enmap({name: "multiplier"});

fs.readdir("./commands/", (err, file) => {
    if(err) console.log("Error: " + err)
  
    let cmdFiles = file.filter(f => f.split(".").pop() === "js");
    if(cmdFiles.length < 1){
      console.log("Error: Commands folder is empty!");
      return;
    }
  
    cmdFiles.forEach((f) => {
      let cmdFile = require(`./commands/${f}`);
      client.commands.set(cmdFile.info.name, cmdFile);
    });
    console.log(`Loaded ${cmdFiles.length} commands successfully.`); 
  });

client.on('ready', async () => {
    client.user.setActivity("CA$H TIME!!")
    console.log(`${client.user.username} is now online.\nTotal Servers: ${client.guilds.size}\nTotal Members: ${client.users.size}`)
});

let activitys = [
    "CA$H TIME",
    "Time to get this ca$h money",
    "Ping me to see my prefix!",
    "This bot is really being annoying to me",
    "Go get a job and stop getting discord ca$h"
]
let activityrng = Math.floor(Math.random() * 5);
setInterval(function (){
    client.user.setActivity(activitys[0])
}, 30000);
setTimeout(function(){
    setInterval(function (){
        client.user.setActivity(activitys[1])
    }, 30000);
}, 10000);
setTimeout(function(){
    setInterval(function (){
        client.user.setActivity(activitys[2])
    }, 30000);
}, 20000);
/*setTimeout(function(){
    setInterval(function (){
        client.user.setActivity(activitys[3])
    }, 50000);
}, 30000);
setTimeout(function(){
    setInterval(function (){
        client.user.setActivity(activitys[4])
    }, 50000);
}, 40000);*/


client.on('guildCreate', async guild => {
    let embed = new Discord.RichEmbed()
    .setTitle("New Server!")
    .setColor("RANDOM")
    .setThumbnail(guild.iconURL)
    .setTimestamp()
    .addField("Name", guild.name)
    .addField("Member Count", guild.memberCount)
    .addField("New Updated Server Count", client.guilds.size)
    
    client.channels.get("529422558412406794").send(embed)
    console.log(`I have been added to ${guild.name}! Guilds member count: ${guild.memberCount}`)
});

client.on('guildMemberRemove', async m => {
    client.money.delete(`${m.id}-${m.guild.id}`)
});

client.on('message', async message => {
    if(message.author.id === client.user.id) return;
    if(message.author.bot === true) return;
    if(message.channel.type === "dm" || message.channel.type === "group") return message.author.send("You cannot use me in DM's! Please go to a server I am in and try again there!")
    let msg = message.content.toLowerCase()
    let gID = message.guild.id;
    let person = message.mentions.members.first()
    if(!person) person = message.member
    let uPerson = message.mentions.users.first()
    if(!uPerson) uPerson = message.author

    const key = `${uPerson.id}-${message.guild.id}`;

    client.money.ensure(key, {
        userid: uPerson.id,
        tag: uPerson.tag,
        nickname: person.displayName,
        serverid: message.guild.id,
        balance: 0
    });

    client.money.set(key, uPerson.tag, "tag");
    client.money.set(key, person.displayName, "nickname");

    const sKey = message.guild.id;

    client.server.ensure(sKey, {
        prefix: "$"
    });
  
    client.multiplier.ensure(key, {
        multiplier: 1
    });

    let prefix = client.server.get(sKey, "prefix");

    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    if(message.content.length === 21 && message.isMemberMentioned(client.user)){
        message.channel.send(`My prefix in this server is ${prefix}`);
    }

    if(!message.content.startsWith(prefix)) return;
  
    let command;

    if(message.content.startsWith(prefix)){
        if (client.commands.has(cmd)) {
            command = client.commands.get(cmd);
        }else{
          if(message.guild.id === "264445053596991498") return;
          let errorEmbed = new Discord.RichEmbed()
          .setTitle("ERROR")
          .setColor("FF0000")
          .addField(`Command not found!`, `Do ${prefix}help to see all avaliable commands`)
          .setFooter(`Requsted by ${message.author.username}`, message.author.avatarURL);
        
          message.channel.send(errorEmbed).then(r => r.delete(5000))
          return;
        }
    }

    try {
        command.code(client, message, args);
    } catch (err){
        return;
    }
    if(prefix == cmd.slice(0,1)){
        let commandFile = client.commands.get(cmd.slice(prefix.length));
        if(commandFile) commandFile.code(client,message,args);
      }
});

client.login(process.env.TOKEN).then(
    console.log(`Logged into CA$H`)
);