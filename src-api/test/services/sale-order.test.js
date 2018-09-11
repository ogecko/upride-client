const assert = require('assert');
const app = require('../../src/app');

describe('\'sale-order\' service', () => {
  it('registered the service', () => {
    const service = app.service('sale-order');

    assert.ok(service, 'Registered the service');
  });
});
