const format_upride_sms_message=require('../../hooks/format_upride_sms_message');
const send_aws_sms=require('../../hooks/send_aws_sms');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [ ],
    create: [ 
      format_upride_sms_message(),
      send_aws_sms({ phone: 'data.seller.mobile', message: 'data.message' }) 
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
