class Calc
{
    static initCalc(hasPrice)
    {
        let totalWorth = 0;
        let totalWorth24h = 0;
        let totalWorth7d = 0;

        hasPrice.forEach(token => {
            const { price } = token.tokenInfo;

            if (isNaN(price.rate)) price['rate'] = 0;
            price['worth'] = price.rate * token.balance;
            token['sortable']['worth'] = price.worth;
            totalWorth += price.worth;

            return null;
        });

        hasPrice.forEach(token => {

            const { price } = token.tokenInfo;
            const { worth } = price;

            price['share'] = (worth / totalWorth) * 100;
            token['sortable']['share'] = price.share;

            if (isNaN(price.diff)) price['diff'] = 0;
            price['worth24h'] = worth / (100 + price.diff) * 100;
            totalWorth24h += price.worth24h;

            if (isNaN(price.diff7d)) price['diff7d'] = 0;
            price['worth7d'] = worth / (100 + price.diff7d) * 100;
            totalWorth7d += price.worth7d;

            return null;
        });

        const totalDiff = ((totalWorth / totalWorth24h) * 100) - 100;
        const totalDiff7d = ((totalWorth / totalWorth7d) * 100) - 100;
        const total = { totalWorth, totalWorth24h, totalWorth7d, totalDiff, totalDiff7d };

        return { total, hasPrice }
    }
}

export default Calc