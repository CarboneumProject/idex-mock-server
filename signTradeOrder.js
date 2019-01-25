const exchange = require('./model/exchange');


let order = exchange.createOrder(
  '0xd42debe4edc92bd5a3fbb4243e1eccf6d63a4a5d', '80000000000000',
  '0x0000000000000000000000000000000000000000', '10000000000000',
);


console.log(JSON.stringify(order, null, 2));
