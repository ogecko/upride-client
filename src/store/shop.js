
const moduleShop = {
    state: {
      cartTotal: 0,
      saleOrder: {},
      cart: {},
      products: [],
    },
    getters: {
      getCartItemCount: (state) => (name) => {
        return state.cart[name] ? state.cart[name].count : 0;
      },
      getCartItemPrice: (state) => (name) => {
        return state.cart[name] ? state.cart[name].price : 0;
      },
      getCartAmount: (state) => () => {
          const amount = Object.keys(state.cart).reduce(
          (acc, name) => acc + state.cart[name].count * state.cart[name].price,
          0);
          return amount;
      }
    },
    mutations: {
      clearCartContents: (state, saleOrder) => {
        state.cartTotal = 0;
        state.cart = {};
        state.saleOrder = { ...saleOrder };
      },
      decItemPriceFromCart: (state, item) => {
        if (state.cart[item.name]) {
          const modifiedPrice = state.cart[item.name].price - 1;
          const modifiedItem = { ...item, count: 1, price: modifiedPrice };
          state.cart = { ...state.cart, [item.name]: modifiedItem };
          if (modifiedPrice == 0) {
            delete state.cart[item.name];
            state.cartTotal--;
          }
        }
      },
      decItemFromCart: (state, item) => {
        if (state.cart[item.name]) {
          const modifiedCount = state.cart[item.name].count - 1;
          const modifiedItem = { ...item, count: modifiedCount };
          state.cart = { ...state.cart, [item.name]: modifiedItem };
          if (modifiedCount == 0) delete state.cart[item.name];
          state.cartTotal--;
        }
      },
      clearItemFromCart: (state, item) => {
        if (state.cart[item.name]) {
          const count = state.cart[item.name].count;
          state.cart = { ...state.cart };
          delete state.cart[item.name];
          state.cartTotal -= count ;
        }
      },
      addItemPriceToCart: (state, item) => {
        const modifiedPrice = state.cart[item.name] ? state.cart[item.name].price + 1 : 1;
        const modifiedItem = { ...item, count: 1, price: modifiedPrice };
        state.cart = { ...state.cart, [item.name]: modifiedItem };
        if (modifiedPrice == 1) state.cartTotal++;
        state.saleOrder = {}; // reset the saleOrder whenever something is added
      },
      addItemToCart: (state, item) => {
        const modifiedCount = state.cart[item.name] ? state.cart[item.name].count + 1 : 1;
        const modifiedItem = { ...item, count: modifiedCount };
        state.cart = { ...state.cart, [item.name]: modifiedItem };
        state.cartTotal++;
        state.saleOrder = {}; // reset the saleOrder whenever something is added
      },
      setProducts: (state, products) => {
        state.products = products;
      }
    }
};

export default moduleShop;

