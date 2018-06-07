const Discord = require('discord.js');
const fs = require("fs");

var client = new Discord.Client();
client.commands = new Discord.Collection();
const prefix = "_";

fs.readdir('./commands/', (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter(f => f.split('.').pop() == 'js')
  if (jsfile.length <= 0){
    console.log("Didn't find commands to load.");
    return;
  }
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`[+] Command ${f} loaded.`);

    if (Array.isArray(props.help.name)) {
      props.help.name.forEach( function(item){
        client.commands.set(item, props);
      })
    }else{
      client.commands.set(props.help.name, props);
    }
  });
});

client.on("ready", function() {
  console.log("[*] Online baby.");
  client.user.setStatus('dnd');
  client.user.setActivity('At your service.');
})

client.on("message", function(message) {
  const member = message.member;
  const mess = message.content.toLowerCase();
  const args = message.content.split(' ').slice(1).join(" ");
  const msgcmd = message.content.split(' ')[0].slice(prefix.length);

  //Avoid replying to itself or other bots
  if (message.author.equals(client.user)) return;
  //Logging
  let messTime = message.createdAt.toString().replace('2018','').replace('GMT-0300 (Hora oficial do Brasil)','');
  if (mess.startsWith(prefix)) console.log(`[*] ${messTime} ${message.author.username}: ${mess}`);

  //Command Handler
  if (mess.startsWith(prefix)) {
    let commandfile = client.commands.get(msgcmd);
    if (commandfile) commandfile.run(client, message, args, msgcmd);
  }
  
});

client.login(process.env.BOT_TOKEN);
