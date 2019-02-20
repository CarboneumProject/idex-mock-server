const WebSocket = require('ws');
const exchange = require('./model/exchange');

const wss = new WebSocket.Server({
  port: 8881,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024 // Size (in bytes) below which messages
    // should not be compressed.
  }
});

wss.on('connection', function connection(ws) {
  ws.on('message', async function incoming(data) {
    console.log(data);
    let payload = JSON.parse(data);
    if (payload['method'] === 'handshake') {
      ws.send(JSON.stringify({
        "sid": "iws:SJblzzUZDmN",
        "result": "success",
        "format": "json",
        "method": "handshake",
        "payload": {}
      }));
    } else if (payload['method'] === 'makeWithdrawal') {
      let ret = await exchange.adminWithdraw(
        payload['payload']['token'],
        payload['payload']['amount'],
        payload['payload']['user'],
        payload['payload']['nonce'],
        payload['payload']['v'],
        payload['payload']['r'],
        payload['payload']['s'],
        '0'
      );
      console.log(ret);
      let user_balance = await exchange.balanceOfWei(payload['payload']['token'], payload['payload']['user']);

      if(parseInt(payload['payload']['amount']) > user_balance){
        await ws.send(JSON.stringify({
          "sid": "iws:SJblzzUZDmN",
          "rid": "0b784e91-1fbb-11e9-b87a-7beb6e9dec1a",
          "result": "success",
          "format": "json",
          "method": "returnValue",
          "payload": {
            "name": "TradeError",
            "message": '{"en":"You cannot withdraw more than your balance."}',
          }
        }));
      } else if (parseInt(payload['payload']['amount']) > 40000000000000000) {
        await ws.send(JSON.stringify({
          "sid": "iws:SJblzzUZDmN",
          "rid": "0b784e91-1fbb-11e9-b87a-7beb6e9dec1a",
          "result": "success",
          "format": "json",
          "method": "returnValue",
          "payload": {}
        }));
      } else {
        await ws.send(JSON.stringify({
          "sid": "iws:SJblzzUZDmN",
          "rid": "0b784e91-1fbb-11e9-b87a-7beb6e9dec1a",
          "result": "success",
          "format": "json",
          "method": "returnValue",
          "payload": {
            "name": "APIError",
            "message": "Minimum withdrawal of 0.04 ETH required (met X percent of minimum). Please enter a higher amount.",
          }
        }));
      }
    }
  });
});
