const upride_format_sale_message = require('../../hooks/upride_format_sale_message');
const notification_sms_aws = require('../../hooks/notification_sms_aws');
const payment_stripe = require('../../hooks/payment_stripe');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [ ],
    create: [
      upride_format_sale_message({ message: 'data.message' }),
      payment_stripe({ token: 'data.token.token_id', amount: 'data.totalAmount' }),
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
