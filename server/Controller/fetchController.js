// import fetch from 'node-fetch';
const fetch = require('node-fetch');
const config= require("../config/config")
exports.fetchController = async (req, res) => {
  try {
    const customHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    // const requestUrl = "https://api.binance.com/api/v3/depth?symbol=ETHBTC&limit=5";
    const requestUrl = `${config.baseURL}/api/v3/depth?symbol=ETHBTC&limit=5`;
    const responseItem = await fetch(requestUrl, { method: 'GET', headers: customHeaders })
    const data = await responseItem.json();
    res.status(200).json({
     data
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
}