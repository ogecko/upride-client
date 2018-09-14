// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const stripe = require("stripe")("sk_test_ktjr2eBx0xSeT18OhobrGELw");
const log = require('../logger');
const _ = require('lodash');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  const { 
    token=undefined,            // context path to the stripe token_id
    amount=undefined,           // context path to the amount
    currency='aud',             // fixed senderID of SMS message
    description='Charge', 
    live_mode=false,
  } = options;

  return async context => {
    const token_val = _.get(context, token);
    const amount_val = _.get(context, amount)*100;

    log.info(`Create Stripe Charge ${amount_val} to ${token_val}`);

    if (live_mode && token_val) {
      const charge = stripe.charges.create({
        currency,
        description,
        amount: amount_val,
        source: token_val,
        statement_descriptor: 'Custom descriptor',
      })
      .then()
      .catch();
    }

    return context;
  };
};
