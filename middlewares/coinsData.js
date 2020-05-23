const CoinpaprikaAPI = require('@coinpaprika/api-nodejs-client');

const client = new CoinpaprikaAPI();
module.exports = async function(){
    tickers = await client.getAllTickers({quotes: ['USD', 'PLN','EUR','GBP']})
    return tickers
    }