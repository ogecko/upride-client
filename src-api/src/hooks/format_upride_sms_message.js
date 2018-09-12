const log = require('../logger');
const _ = require('lodash');

function aud(x) {
    return '$' + new Intl.NumberFormat('en-AU', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(x);
}

// returns a hook function that sends an SMS
module.exports = function (opts={}) {
    return context => {
        const f = { 
            ...context.data, 
            products: _.chain(context.data.cart)
                        .reduce(
                            (acc, item) => { 
                                acc.push( item.name=='Driver tip' 
                                    ? `${aud(item.price)} Driver tip`
                                    : `${item.count} x ${item.name}`
                                ); 
                                return acc;
                            },
                            [])
                        .sortBy()
                        .value()
                        .join(', ')
        }
        context.data.message = `Hi ${f.seller.name}, ${f.buyer.name} just paid ${aud(f.totalAmount)} for ${f.products}. Thanks.`;
    };
};
  
