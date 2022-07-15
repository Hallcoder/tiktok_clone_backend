const express = require('express');
const { getAccounts } = require('../controllers/accounts');
const router = express.Router();
router
.get('/',getAccounts())

module.exports.accounts  = router