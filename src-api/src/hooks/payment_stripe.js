// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const stripe = require("stripe")();
const log = require('../logger');
const _ = require('lodash');
const { stripe_keys } = require('../../config/credentials');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  const { 
    token=undefined,            // context path to the stripe token_id
    amount=undefined,           // context path to the amount
    message='undefined',        // context path to the sms message body
    currency='aud',             // fixed senderID of SMS message
    desc='Charge', 
    mode=stripe_keys.mode,      // either 'test' or 'live'
  } = options;

  return async context => {
    const token_val = _.get(context, token);
    const amount_val = _.get(context, amount)*100;
    const message_val = _.get(context, message);

    if ((mode=='test'||mode=='live') && token_val) {
      log.info(`Create Stripe Charge ${amount_val} to ${token_val}`);
      const api_key = stripe_keys[mode].secret_key;
      const charge = await stripe.charges.create({
        description: desc,
        statement_descriptor: desc,
        currency,
        amount: amount_val,
        source: token_val,
        metadata: {
          message: message_val,
        },
      }, { api_key })
    }

    return context;
  };
};
