class Sorter
{

    static placer(tokens) {
        let hasPrice = [];
        let noPrice = [];
        let key = [];

        tokens.map(token => {

            const { balance, tokenInfo } = token;
            const { price, decimals, symbol } = tokenInfo;

            token['sortable'] = {};
            token['balance'] = balance / Math.pow(10, decimals);
            token['sortable']['balance'] = token.balance;

            let keySlug = null;
            while (key[symbol + keySlug] !== undefined) {
                if (keySlug === null) keySlug = 0;
                else keySlug++;
            }
            key[symbol + keySlug] = true;
            token['key'] = symbol + keySlug;

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

    static sorter(tokens, key) {
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

        return sorted;
    }
}

export default Sorter;