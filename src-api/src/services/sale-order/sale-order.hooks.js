const upride_format_sale_message = require('../../hooks/upride_format_sale_message');
const notification_sms_aws = require('../../hooks/notification_sms_aws');
const payment_stripe = require('../../hooks/payment_stripe');

const sale_order_validate = require('../../hooks/sale_order_validate');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [ ],
    create: [
      sale_order_validate(),
      upride_format_sale_message({ message: 'data.message' }),
      payment_stripe({ token: 'data.token.token_id', amount: 'data.totalAmount', message: 'data.message', desc: 'Upride Charge' }),
      notification_sms_aws({ sender: 'UpRide', mobile: 'data.seller.mobile', message: 'data.message' }),
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
