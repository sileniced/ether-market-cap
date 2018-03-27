class Sorter
{
    static placer(tokens) {
        let hasPrice = [];
        let noPrice = [];

        tokens.map(token => {

            const { balance, tokenInfo } = token;
            const { price, decimals } = tokenInfo;

            token['sortable'] = {};
            token['balance'] = balance / Math.pow(10, decimals);
            token['sortable']['balance'] = token.balance;

            if (price === false) {
                noPrice.push(token);
            } else {
                token['sortable']['diff'] = parseFloat(price.diff);
                token['sortable']['diff7d'] = parseFloat(price.diff7d);
                token['sortable']['rate'] = parseFloat(price.rate);
                token['sortable']['marketCapUsd'] = parseInt(price.marketCapUsd, 10);

                hasPrice.push(token)
            }

            return null;
        });

        return { hasPrice, noPrice };
    }

    static sorter(tokens, key, order) {
        const sorted = [];

        tokens.map(token => {

            if (sorted.length === 0) {
                sorted.push(token);
            } else {

                for (let i = 0; i < sorted.length; i++) {

                    if (token.sortable[key] >= sorted[i].sortable[key]) {
                        sorted.splice(i, 0, token);
                        break;
                    }

                    if (i === sorted.length - 1) {
                        sorted.push(token);
                        break;
                    }

                }
            }

            return null;
        });

        if (order === "ASC") sorted.reverse();

        return sorted;
    }
}

export default Sorter;