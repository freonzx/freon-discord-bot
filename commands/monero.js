const Discord = require("discord.js");
const monero = require("monero");

var realvalor = 3.50;

module.exports.run = async (bot, message, args, cmd) => {

  monero.price(function(price) {
    message.channel.send(message.author + " O preço do Monero é " + price + " $USD Aproximadamente R$ " + price * realvalor );
  })
}

module.exports.help = {
  name: "monero"
}
