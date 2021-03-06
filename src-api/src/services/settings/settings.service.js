// Initializes the `settings` service on path `/api/settings`
const createService = require('./settings.class.js');
const hooks = require('./settings.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/settings', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/settings');

  service.hooks(hooks);
};
