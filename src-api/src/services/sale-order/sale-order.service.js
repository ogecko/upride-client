// Initializes the `sale-order` service on path `/sale-order`
const createService = require('./sale-order.class.js');
const hooks = require('./sale-order.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/sale-order', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('/api/sale-order');

  service.hooks(hooks);
};
