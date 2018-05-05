const Discord = require('discord.js');
const btcValue = require('btc-value');
const monero = require('monero');

Number.prototype.formatMoney = function(c, d, t){
var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };


var bot = new Discord.Client();
bot.on("ready", function() {
    console.log("Bot is ready...");
    bot.user.setStatus('dnd');
    bot.user.setActivity('At your service.');
})
bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;
    if (message.content == "!btc") {
        btcValue().then(value => {
            btcValue.getPercentageChangeLastDay().then(percentage => {
                var perc = percentage
                if (perc > 0) {
                    message.channel.send(message.author +" O preço do  BTC é " + value + " $USD ou R$ " + (value * 3.40).formatMoney(2) +"\nSubiu (ultimo dia): " + perc + "% :hugging:");
                } else if (perc < 0) {
                    message.channel.send(message.author +" O preço do  BTC é " + value + " $USD ou R$ " + (value * 3.40).formatMoney(2) +"\nDesceu (ultimo dia): " + perc + "% :sob:");
                } else {
                    message.channel.send(message.author +" O preço do  BTC é " + value + " $USD ou R$ " + (value * 3.40).formatMoney(2) +"\nManteve (ultimo dia): " + perc + "% :rolling_eyes:");
                }
            });
        });
    }

    if (message.content == "!xmr") {
        monero.price(function(price) {
            message.channel.send(message.author + " O preço do Monero é " + price + " $USD Aproximadamente R$ " + (price * 3.40).formatMoney(2) );
        })
    }
});

bot.login(process.env.BOT_TOKEN);
