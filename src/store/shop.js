const moduleShop = {
    state: {
      cartTotal: 0,
      cart: {},
      sale: false,
      products: [],
    },
    getters: {
      getCartCount: (state) => (name) => {
        return state.cart[name] ? state.cart[name].count : 0;
      },
    },
    mutations: {
      switchSale: state => {
        state.sale = !state.sale;
      },
      clearCartCount: state => {
        state.cartTotal = 0;
      },
      clearCartContents: state => {
        state.cart = {};
      },
      addItem: (state, item) => {
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

