const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const saleOrderValidate = require('../../src/hooks/sale_order_validate');

describe('\'sale_order_validate\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: saleOrderValidate()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
