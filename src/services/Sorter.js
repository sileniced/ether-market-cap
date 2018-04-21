import Calc from "./Calc";

class Sorter
{

    static placer(tokens) {
        let hasPrice = [];
        let noPrice = [];
        let key = [];

        const slugger = (symbol, slug) =>
        {
            return (key[symbol + slug] !== undefined)
                ? slugger(symbol, (slug === undefined) ? 0 : ++slug)
                : symbol + ((slug === undefined) ? '' : slug);
        };

        tokens.map(token => {

            const { balance, tokenInfo } = token;
            const { price, decimals, symbol } = tokenInfo;

            token['sortable'] = {};
            token['balance'] = Calc.balance(balance, decimals);
            token['sortable']['balance'] = token.balance;

            token['key'] = slugger(symbol);
            key[token.key] = true;

            if (price === false) {
                noPrice.push(token);
            } else {

                const { diff, diff7d, rate, marketCapUsd } = price;

                token['sortable']['diff'] = parseFloat(diff);
                token['sortable']['diff7d'] = parseFloat(diff7d);
                token['sortable']['rate'] = parseFloat(rate);
                token['sortable']['marketCapUsd'] = parseInt(marketCapUsd, 10);

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