const express = require('express');
const router = express.Router();
const currency = require('../data/currencies');

router.post('/returnTicker', async (req, res, next) => {
  try {

    res.send({
      "last": "0.000981",
      "high": "0.0010763",
      "low": "0.0009777",
      "lowestAsk": "0.00098151",
      "highestBid": "0.0007853",
      "percentChange": "-1.83619353",
      "baseVolume": "7.3922603247161",
      "quoteVolume": "7462.998433"
    });
  } catch (e) {
    console.error(e);
    return res.send({'status': 'no', 'message': e.message});
  }
});

router.post('/returnCurrencies', async (req, res, next) => {
  try {
    res.send(currency);
  } catch (e) {
    console.error(e);
    return res.send({'status': 'no', 'message': e.message});
  }
});

router.post('/return24Volume', async (req, res, next) => {
  try {

    res.send({
      "ETH_REP": {
        "ETH": "1.3429046745",
        "REP": "105.29046745"
      },
      "ETH_DVIP": {
        "ETH": "4",
        "DVIP": "4"
      },
      "ETH_C8": {
        "ETH": "4",
        "C8": "4"
      },
      "totalEth": "5.3429046745"
    });
  } catch (e) {
    console.error(e);
    return res.send({'status': 'no', 'message': e.message});
  }
});

router.post('/returnBalances', async (req, res, next) => {
  try {

    res.send({
      "ETH": "25.55306545",
      "DVIP": "200000000.31012358",
      "C8": "8616000.31012358"
    });
  } catch (e) {
    console.error(e);
    return res.send({'status': 'no', 'message': e.message});
  }
});

router.post('/returnCompleteBalances', async (req, res, next) => {
  try {

    res.send({
      "REP": {
        "available": "25.55306545",
        "onOrders": "0"
      },
      "C8": {
        "available": "8616000.31012358",
        "onOrders": "0"
      }
    });
  } catch (e) {
    console.error(e);
    return res.send({'status': 'no', 'message': e.message});
  }
});

router.post('/returnDepositsWithdrawals', async (req, res, next) => {
  try {

    res.send({
      "deposits": [
        {
          "depositNumber": 265,
          "currency": "ETH",
          "amount": "4.5",
          "timestamp": 1506550595,
          "transactionHash": "0x52897291dba0a7b255ee7a27a8ca44a9e8d6919ca14f917616444bf974c48897"
        }
      ],
      "withdrawals": [
        {
          "withdrawalNumber": 174,
          "currency": "ETH",
          "amount": "4.5",
          "timestamp": 1506552152,
          "transactionHash": "0xe52e9c569fe659556d1e56d8cca2084db0b452cd889f55ec3b4e2f3af61faa57",
          "status": "COMPLETE"
        }
      ]
    });
  } catch (e) {
    console.error(e);
    return res.send({'status': 'no', 'message': e.message});
  }
});

router.post('/returnOpenOrders', async (req, res, next) => {
  try {

    res.send([
      {
        "timestamp": 1516415000,
        "market": "ETH_AURA",
        "orderNumber": 2101,
        "orderHash": "0x3fe808be7b5df3747e5534056e9ff45ead5b1fcace430d7b4092e5fcd7161e21",
        "price": "0.000129032258064516",
        "amount": "3100",
        "total": "0.4",
        "type": "buy",
        "params": {}
      }
    ]);
  } catch (e) {
    console.error(e);
    return res.send({'status': 'no', 'message': e.message});
  }
});

router.post('/returnOrderBook', async (req, res, next) => {
  try {

    res.send({
      "bids": [
        {
          "timestamp": 1516415000,
          "market": "ETH_AURA",
          "orderNumber": 2101,
          "orderHash": "0x3fe808be7b5df3747e5534056e9ff45ead5b1fcace430d7b4092e5fcd7161e21",
          "price": "0.000129032258064516",
          "amount": "3100",
          "total": "0.4",
          "type": "buy",
          "params": {
            "tokenBuy": "0x7c5a0ce9267ed19b22f8cae653f198e3e8daf098",
            "buyPrecision": 18,
            "amountBuy": "3100000000000000000000",
            "tokenSell": "0x0000000000000000000000000000000000000000",
            "sellPrecision": 18,
            "amountSell": "400000000000000000",
            "expires": 100000,
            "nonce": "1",
            "user": "0x57b080554ebafc8b17f4a6fd090c18fc8c9188a0"
          }
        }
      ],
      "asks": [
        {
          "timestamp": 1516415000,
          "market": "ETH_AURA",
          "orderNumber": 2101,
          "orderHash": "0x3fe808be7b5df3747e5534056e9ff45ead5b1fcace430d7b4092e5fcd7161e21",
          "price": "0.000129032258064516",
          "amount": "3100",
          "total": "0.4",
          "type": "buy",
          "params": {
            "tokenBuy": "0x7c5a0ce9267ed19b22f8cae653f198e3e8daf098",
            "buyPrecision": 18,
            "amountBuy": "3100000000000000000000",
            "tokenSell": "0x0000000000000000000000000000000000000000",
            "sellPrecision": 18,
            "amountSell": "400000000000000000",
            "expires": 100000,
            "nonce": "1",
            "user": "0x57b080554ebafc8b17f4a6fd090c18fc8c9188a0"
          }
        }
      ]
    });
  } catch (e) {
    console.error(e);
    return res.send({'status': 'no', 'message': e.message});
  }
});

router.post('/returnOrderStatus', async (req, res, next) => {
  try {

    res.send({
      "timestamp": 1516415000,
      "market": "ETH_AURA",
      "orderNumber": 2101,
      "orderHash": "0x3fe808be7b5df3747e5534056e9ff45ead5b1fcace430d7b4092e5fcd7161e21",
      "price": "0.000129032258064516",
      "amount": "3100",
      "total": "0.4",
      "type": "buy",
      "params": {
        "tokenBuy": "0x7c5a0ce9267ed19b22f8cae653f198e3e8daf098",
        "buyPrecision": 18,
        "amountBuy": "3100000000000000000000",
        "tokenSell": "0x0000000000000000000000000000000000000000",
        "sellPrecision": 18,
        "amountSell": "400000000000000000",
        "expires": 100000,
        "nonce": "1",
        "user": "0x57b080554ebafc8b17f4a6fd090c18fc8c9188a0"
      },
      "filled": "1900",
      "initialAmount": "5000",
      "status": "open"
    });
  } catch (e) {
    console.error(e);
    return res.send({'status': 'no', 'message': e.message});
  }
});

router.post('/returnOrderTrades', async (req, res, next) => {
  try {

    res.send([
      {
        "amount": "0.3",
        "type": "buy",
        "total": "0.09",
        "price": "0.3",
        "uuid": "e8719a10-aecc-11e7-9535-3b8451fd4699",
        "transactionHash": "0x28b945b586a5929c69337929533e04794d488c2d6e1122b7b915705d0dff8bb6"
      }
    ]);
  } catch (e) {
    console.error(e);
    return res.send({'status': 'no', 'message': e.message});
  }
});

router.post('/returnTradeHistory', async (req, res, next) => {
  try {

    res.send([
      {
        "date": "2018-12-11 17:12:10",
        "amount": "895.9935",
        "type": "sell",
        "total": "0.281156244937868708",
        "price": "0.000313792728337726",
        "orderHash": "0xc0cca964a3b829541841ebdc2d938936b9593924cf2bd0de359bc6a5ff4a0ee8",
        "uuid": "ca5ca940-cd78-11e8-812d-3b7d27265b69",
        "tid": 2564227,
        "buyerFee": "0.8959935",
        "sellerFee": "0.000562312489875737",
        "gasFee": "0.00425",
        "timestamp": 1539277930,
        "maker": "0x1d1fa573d0d1d4ab62cf59273941a27e3862f55b",
        "taker": "0x2d98a4263084f918130410c66d9ecbe5325f7edf",
        "transactionHash": "0x1b651d0c0578008296f0edf237fdbece67797a0bee9a28c5e4313e44844b25a2",
        "usdValue": "55.976138551905106037"
      }
    ]);
  } catch (e) {
    console.error(e);
    return res.send({'status': 'no', 'message': e.message});
  }
});

router.post('/returnContractAddress', async (req, res, next) => {
  try {

    res.send({
      "address": "0x2a0c0dbecc7e4d658f48e01e3fa353f44050c208"
    });
  } catch (e) {
    console.error(e);
    return res.send({'status': 'no', 'message': e.message});
  }
});

router.post('/returnNextNonce', async (req, res, next) => {
  try {

    res.send({
      "nonce": `${Date.now()}`
    });
  } catch (e) {
    console.error(e);
    return res.send({'status': 'no', 'message': e.message});
  }
});

/*
* Contract backend endpoint.
*
*/
router.post('/order', async (req, res, next) => {
  try {
    // Keep order to smart contract.
    res.send({
      "timestamp": 1516415000,
      "market": "ETH_AURA",
      "orderNumber": 2101,
      "orderHash": "0x3fe808be7b5df3747e5534056e9ff45ead5b1fcace430d7b4092e5fcd7161e21",
      "price": "0.000129032258064516",
      "amount": "3100",
      "total": "0.4",
      "type": "buy",
      "params": {
        "tokenBuy": "0x7c5a0ce9267ed19b22f8cae653f198e3e8daf098",
        "buyPrecision": 18,
        "amountBuy": "3100000000000000000000",
        "tokenSell": "0x0000000000000000000000000000000000000000",
        "sellPrecision": 18,
        "amountSell": "400000000000000000",
        "expires": 100000,
        "nonce": "1",
        "user": "0x57b080554ebafc8b17f4a6fd090c18fc8c9188a0"
      }
    });
  } catch (e) {
    console.error(e);
    return res.send({'status': 'no','message': e.message});
  }
});

router.post('/cancel', async (req, res, next) => {
  try {
    // Keep order to smart contract.
    res.send({
      "nonce": "5000"
    });
  } catch (e) {
    console.error(e);
    return res.send({'status': 'no','message': e.message});
  }
});

router.post('/trade', async (req, res, next) => {
  try {
    // Keep order to smart contract.
    res.send({
      "nonce": "5000"
    });
  } catch (e) {
    console.error(e);
    return res.send({'status': 'no','message': e.message});
  }
});

router.post('/withdraw', async (req, res, next) => {
  try {
    // Keep order to smart contract.
    res.send({
      "nonce": "5000"
    });
  } catch (e) {
    console.error(e);
    return res.send({'status': 'no','message': e.message});
  }
});

module.exports = router;
