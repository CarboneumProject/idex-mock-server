const exchange = require('./model/exchange');
const {bufferToHex} = require('ethereumjs-util');
let request = require("request");
const Web3 = require('web3');
let w3 = new Web3();

let order = exchange.createOrder(
  '0xd42debe4edc92bd5a3fbb4243e1eccf6d63a4a5d', '80000000000000',
  '0x0000000000000000000000000000000000000000', '10000000000000',
);


console.log(JSON.stringify(order, null, 2));

// Check recover
let v = bufferToHex(order['v']);
let r = order['r'];
let s = order['s'];
let messageHash = order['messageHash'];
let address = w3.eth.accounts.recover({
  messageHash: messageHash,
  v: v,
  r: r,
  s: s
});
console.log(order['address']);
console.log('\t\t\t\t\tV');
console.log(address.toLowerCase());



let options = { method: 'POST',
  url: 'http://rinkeby-api.carbonradars.io/idex-api/order',
  headers: { 'content-type': 'application/json' },
  body: order,
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
