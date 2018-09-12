const send_aws_sms=require('../../hooks/send_aws_sms');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [ send_aws_sms() ],
    create: [  ],
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
