const WebSocket = require('ws');

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
  ws.on('message', function incoming(data) {
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
      // TODO withdraw from IDEX contract.
      ws.send(JSON.stringify({
        "sid": "iws:SJblzzUZDmN",
        "rid": "0b784e91-1fbb-11e9-b87a-7beb6e9dec1a",
        "result": "success",
        "format": "json",
        "method": "returnValue",
        "payload": [{
          "id": 1297199,
          "user": "0x6e4891e67345549d8d63592f2e11afaebf66238d",
          "token": "0x0000000000000000000000000000000000000000",
          "amount": "296900000000000000",
          "transactionHash": "0x0bb1948328653242f49bfef4bd03252ea54676f3dc005ddcd42199076458043b",
          "createdAt": "2019-01-17T10:58:36.000Z",
          "updatedAt": "2019-01-17T10:58:36.000Z"
        }]
      }));
    }
  });
});
