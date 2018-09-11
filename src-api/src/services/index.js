const saleOrder = require('./sale-order/sale-order.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(saleOrder);
};
