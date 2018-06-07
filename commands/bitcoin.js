const Discord = require("discord.js");
const btcValue = require('btc-value');
const currencyFormatter = require('currency-formatter');

var realvalue = 3.50;

module.exports.run = async (bot, message, args, cmd) => {
  //
  // btcValue().then(value => {
  //   btcValue.getPercentageChangeLastDay().then(percentage => {
  //     let perc = percentage
  //
  //     if (perc > 0) {
  //       console.log(currency(value));
  //       message.channel.send(message.author + " O preço do  BTC é " + value + " $USD ou R$ " + value * realvalue + "\nSubiu (ultimo dia): " + perc + "% :hugging:");
  //     } else if (perc < 0) {
  //       message.channel.send(message.author + " O preço do  BTC é " + value + " $USD ou R$ " + value * realvalue + "\nDesceu (ultimo dia): " + perc + "% :sob:");
  //     } else {
  //       message.channel.send(message.author + " O preço do  BTC é " + value + " $USD ou R$ " + value * realvalue + "\nManteve (ultimo dia): " + perc + "% :rolling_eyes:");
  //     }
  //   });
  // });
  async function process (p) {
    let br = 3.50;
    var price = await btcValue(Number(p));
    let priceusd = await currencyFormatter.format(price, { locale: 'en-US' });
    let pricereal = await currencyFormatter.format( (price * br), { locale: 'pt-BR' });

    console.log(price);
    if (price.percentage > 0) {
          message.channel.send(message.author + " O preço de " + args +" BTC é " + priceusd + " ou " + pricereal + "\nSubiu (ultimo dia): " + price.percentage + "% :hugging:");
        } else if (price.percentage < 0) {
          message.channel.send(message.author + " O preço de " + args +" BTC é " + priceusd + " $USD ou R$ " + pricereal + "\nDesceu (ultimo dia): " + price.percentage + "% :sob:");
        } else {
          message.channel.send(message.author + " O preço de " + args +" BTC é " + priceusd + " $USD ou R$ " + pricereal + "\nManteve (ultimo dia): " + price.percentage + "% :rolling_eyes:");
        }
  }
  process(args);
}

module.exports.help = {
  name: "btc"
}
