const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const createStripeCharge = require('../../src/hooks/create_stripe_charge');

describe('\'create_stripe_charge\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: createStripeCharge()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
