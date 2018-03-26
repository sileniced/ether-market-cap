class Calc
{
    static initCalc(hasPrice)
    {
        let totalWorth = 0;
        let totalWorth24h = 0;
        let totalWorth7d = 0;
        let totalDiffSum = 0;

        hasPrice.map(token => {
            const { price } = token.tokenInfo;
            price['worth'] = Calc.worth(price.rate, token.balance);
            totalWorth += price.worth;

            price['worth24h'] = price.worth / (100 + price.diff) * 100;
            totalWorth24h += price.worth24h;

            price['worth7d'] = price.worth / (100 + price.diff7d) * 100;
            totalWorth7d += price.worth7d;

            token['sortable']['worth'] = price.worth;
        });

        hasPrice.map(token => {
            const { price } = token.tokenInfo;
            price['share'] = (price.worth / totalWorth) * 100;
            token['sortable']['share'] = price.share;

            totalDiffSum += price.diff * price.share;
        });

        const totalDiff = ((totalWorth / totalWorth24h) * 100) - 100;
        const totalDiff7d = ((totalWorth / totalWorth7d) * 100) - 100;

        return { totalWorth, hasPrice, totalDiff, totalDiff7d }
    }

    static balance (balance, decimals)
    {
        return Math.round(balance / Math.pow(10, decimals - 2)) / 100;
    }

    static worth (rate, balance)
    {
        return Math.round(rate * balance * 100) / 100;
    }
}

export default Calc