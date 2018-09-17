/* eslint-disable no-unused-vars */
const { stripe_keys } = require('../../../config/credentials');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  async get (id, params) {
    if (id=='stripe') {
      return {
        id, 
        mode: stripe_keys.mode,
        publishable_key: stripe_keys[stripe_keys.mode].publishable_key,
      };
    } else {
      throw new Error(`No known settings '${id}'`);
    }
  }

}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
