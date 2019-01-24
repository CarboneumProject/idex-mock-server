const express = require('express');
const router = express.Router();


router.post('/', async (req, res, next) => {
  try {
   // Keep order to smart contract.
  } catch (e) {
    console.error(e);
    return res.send({'status': 'no','message': e.message});
  }
});

module.exports = router;
