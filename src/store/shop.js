
const moduleShop = {
    state: {
      cartTotal: 0,
      cart: {},
      products: [],
    },
    getters: {
      getCartItemCount: (state) => (name) => {
        return state.cart[name] ? state.cart[name].count : 0;
      },
      getCartAmount: (state) => () => {
          const amount = Object.keys(state.cart).reduce(
          (acc, name) => acc + state.cart[name].count * state.cart[name].price,
          0);
          return amount;
      }
    },
    mutations: {
      clearCartCount: state => {
        state.cartTotal = 0;
      },
      clearCartContents: state => {
        state.cart = {};
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
      addItemToCart: (state, item) => {
        const modifiedCount = state.cart[item.name] ? state.cart[item.name].count + 1 : 1;
        const modifiedItem = { ...item, count: modifiedCount };
        state.cart = { ...state.cart, [item.name]: modifiedItem };
        state.cartTotal++;
      },
      setProducts: (state, products) => {
        state.products = products;
      }
    }
};

export default moduleShop;

