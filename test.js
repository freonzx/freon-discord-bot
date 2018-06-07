const btcValue = require('btc-value');
const currencyFormatter = require('currency-formatter');

async function process (p) {
  let br = 3.50;
  let price = await btcValue(p);
  console.log("Preço USD " + currencyFormatter.format(price, { locale: 'en-US' }));
  let pricereal = await currencyFormatter.format( (price * br), { locale: 'pt-BR' });
  console.log(`Preço ${pricereal}`);
  return price;
}
process(1);
