class Calc
{
    static initCalc(hasPrice, eth_price)
    {
        let totalWorth = 0;
        let totalWorth24h = 0;
        let totalWorth7d = 0;

        hasPrice.forEach(token => {
            const { balance, tokenInfo, cryptoCompare } = token;
            const { price } = tokenInfo;
            const { TotalCoinSupply } = cryptoCompare;

            if (isNaN(price.rate)) price['rate'] = 0;
            price['worth'] = price.rate * token.balance;
            token['sortable']['worth'] = price.worth;
            totalWorth += price.worth;

            token['userShare'] = balance / TotalCoinSupply;


            return null;
        });

        hasPrice.forEach(token => {

            const { price } = token.tokenInfo;
            const { worth, rate } = price;

            price['share'] = (worth / totalWorth) * 100;
            token['sortable']['share'] = price.share;

            if (isNaN(price.diff)) price['diff'] = 0;
            price['worth24h'] = worth / (100 + price.diff) * 100;
            price['rate24h'] = rate / (100 + price.diff) * 100;
            price['rate24h_diff'] = price.rate - price.rate24h;
            token['balance24h'] = price.worth24h / price.rate;
            token['balance24h_diff'] = token.balance24h - token.balance;
            totalWorth24h += price.worth24h;

            if (isNaN(price.diff7d)) price['diff7d'] = 0;
            price['worth7d'] = worth / (100 + price.diff7d) * 100;
            price['rate7d'] = rate / (100 + price.diff7d) * 100;
            price['rate7d_diff'] = price.rate - price.rate7d;
            token['balance7d'] = price.worth7d / price.rate;
            token['balance7d_diff'] = token.balance7d - token.balance;
            totalWorth7d += price.worth7d;

            return null;
        });

        const totalDiff = ((totalWorth / totalWorth24h) * 100) - 100;
        const totalDiff7d = ((totalWorth / totalWorth7d) * 100) - 100;
        const totalEth = totalWorth / eth_price;

        const total = { totalWorth, totalEth, totalWorth24h, totalWorth7d, totalDiff, totalDiff7d };

        return { total, hasPrice }
    }

    static balance (balance, decimals)
    {
        return balance / Math.pow(10, decimals)
    }
}

export default Calc