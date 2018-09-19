const log = require('../logger');
const _ = require('lodash');

function aud(x) {
    return '$' + new Intl.NumberFormat('en-AU', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(x);
}

// returns a hook function that sets the context.data.message property to a summary of the sales order (can be used for an SMS)
module.exports = function (options={}) {
    const { 
        message=undefined,          // context path to the message to send
    } = options;

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
                        .join('\n')
        }
        _.set(context, message, `Hi ${f.seller.name},\n${f.buyer.name} ordered:\n\n${f.products}\n\nPlease hand over the products when safe to do so. Thanks.`);
    };
};
  
