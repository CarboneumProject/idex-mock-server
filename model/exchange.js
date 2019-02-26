const HDWalletProvider = require('truffle-hdwallet-provider');
const idexABI = require('../abi/IDEX/exchange.json');
const Web3 = require('web3');
const {soliditySha3} = require('web3-utils');
const {
  hashPersonalMessage,
  bufferToHex,
  toBuffer,
  ecsign
} = require('ethereumjs-util');

const {mapValues} = require('lodash');
const providerWithMnemonic = (mnemonic, rpcEndpoint) =>
  new HDWalletProvider(mnemonic, rpcEndpoint);
const infuraProvider = network => providerWithMnemonic(
  process.env.MNEMONIC || '',
  `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`,
);

const contractAddress = process.env.IDEX_ADDRESS || '0xb583ef86fbaa630a67b62435ee797cb5ae4cc7e1';
const exchange = {};
const provider = infuraProvider(process.env.NETWORK || 'rinkeby');

let w3 = new Web3(provider);
let idexContract = new w3.eth.Contract(
  idexABI,
  contractAddress,
);

exchange.trade = async function trade(tradeValues, tradeAddresses, v, rs) {
  return await idexContract.methods.trade(tradeValues, tradeAddresses, v, rs).send({
    from: provider.addresses[0],
    value: 0,
    gasLimit: 310000,
    gasPrice: w3.eth.gasPrice
  });
};

exchange.adminWithdraw = async function adminWithdraw(token, amount, user, nonce, v, r, s, feeWithdrawal) {
  return await idexContract.methods.adminWithdraw(token, amount, user, nonce, v, r, s, feeWithdrawal).send({
    from: provider.addresses[0],
    value: 0,
    gasLimit: 310000,
    gasPrice: w3.eth.gasPrice
  });
};

exchange.orderHash = function orderHash(tokenBuy, amountBuy, tokenSell, amountSell, expires, nonce, address) {
  const raw = soliditySha3({
    t: 'address',
    v: contractAddress
  }, {
    t: 'address',
    v: tokenBuy
  }, {
    t: 'uint256',
    v: amountBuy
  }, {
    t: 'address',
    v: tokenSell
  }, {
    t: 'uint256',
    v: amountSell
  }, {
    t: 'uint256',
    v: expires
  }, {
    t: 'uint256',
    v: nonce
  }, {
    t: 'address',
    v: address
  });
  return bufferToHex(toBuffer(raw));
};

exchange.withdrawHash = function withdrawHash(address, amount, token, nonce) {
  const raw = soliditySha3({
    t: 'address',
    v: contractAddress
  }, {
    t: 'address',
    v: token
  }, {
    t: 'uint256',
    v: amount
  }, {
    t: 'uint256',
    v: nonce
  }, {
    t: 'address',
    v: address
  });
  return bufferToHex(toBuffer(raw));
};

exchange.createOrder = function createOrder(tokenBuy, amountBuy, tokenSell, amountSell) {
  let expires = 0;
  let address = provider.addresses[0];
  let privateKeyBuffer = provider.wallets[address]['_privKey'];
  let nonce = `${Date.now()}`;

  const orderHashHex = exchange.orderHash(tokenBuy, amountBuy, tokenSell, amountSell, expires, nonce, address);
  const salted = hashPersonalMessage(toBuffer(orderHashHex));
  const {
    v,
    r,
    s
  } = mapValues(ecsign(salted, privateKeyBuffer), (value, key) => key === 'v' ? value : bufferToHex(value));

  return {
    tokenBuy: tokenBuy,
    amountBuy: amountBuy,
    tokenSell: tokenSell,
    amountSell: amountSell,
    address: address,
    nonce: nonce,
    expires: expires,
    v: v,
    r: r,
    s: s,
    orderHash: orderHashHex,
    messageHash: bufferToHex(salted)
  }
};

exchange.createTrade = function createTrade(orderHash, amount) {
  let address = provider.addresses[0];
  let taker = address;
  let privateKeyBuffer = provider.wallets[address]['_privKey'];
  let nonce = `${Date.now()}`;

  const raw = soliditySha3({
    t: 'bytes32',
    v: orderHash
  },  {
    t: 'uint256',
    v: amount
  }, {
    t: 'address',
    v: taker
  }, {
    t: 'uint256',
    v: nonce
  });
  const salted = hashPersonalMessage(toBuffer(raw));
  const {
    v,
    r,
    s
  } = mapValues(ecsign(salted, privateKeyBuffer), (value, key) => key === 'v' ? value : bufferToHex(value));

  return {
    taker: taker,
    nonce: nonce,
    v: v,
    r: r,
    s: s,
    tradeHash: bufferToHex(toBuffer(raw))
  }
};

exchange.createWithdraw = function createWithdraw(token, amount) {
  let address = provider.addresses[0];
  let privateKeyBuffer = provider.wallets[address]['_privKey'];
  let nonce = `${Date.now()}`;

  const raw = soliditySha3({
    t: 'address',
    v: contractAddress
  }, {
    t: 'address',
    v: token
  }, {
    t: 'uint256',
    v: amount
  }, {
    t: 'address',
    v: address
  }, {
    t: 'uint256',
    v: nonce
  });
  const salted = hashPersonalMessage(toBuffer(raw));
  const {
    v,
    r,
    s
  } = mapValues(ecsign(salted, privateKeyBuffer), (value, key) => key === 'v' ? value : bufferToHex(value));

  return {
    address: address,
    nonce: nonce,
    v: v,
    r: r,
    s: s,
    messageHash: bufferToHex(salted)
  }
};

exchange.balanceOf = async function balanceOf(token, user) {
  let balance = await idexContract.methods.balanceOf(token, user).call();
  console.log(balance);
  return balance / Web3.utils.toBN(Math.pow(10, 18));
};

exchange.balanceOfWei = async function balanceOf(token, user) {
  let balance = await idexContract.methods.balanceOf(token, user).call();
  return balance;
};


module.exports = exchange;
