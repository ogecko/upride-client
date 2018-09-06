<template>
  <q-page padding>
    <h3 class="text-align-center text-weight-bold q-my-xs">Checkout</h3>
            <CartTip />
            <CartItem 
              v-for="item in cart" 
              :item="item" :key="item.name"
            />
            <div class="row q-my-xs text-weight-bold">
              <div class="col-8  text-right">Total Due:</div>
              <div class="col-3  text-right">{{amount | aud}}</div>
              <div class="col-1"></div>
            </div>
            
  </q-page>
</template>


<style scoped>
  .text-align-center {
    text-align: center;
  }
</style>

<script>
import CartItem from '../components/CartItem.vue';
import CartTip from '../components/CartTip.vue';
export default {
  components: {
    CartItem, CartTip
  },
  name: 'PageCart',
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    amount() {
      return this.$store.getters.getCartAmount();
    },
  },
  beforeMount() {
    if (this.$store.state.products.length==0) {
      this.$q.notify({ message: 'Please choose a driver code first'});
      this.$router.push('/driver')
      return;
    }
    if (Object.keys(this.$store.state.cart).length==0) {
      this.$q.notify({ type: 'info', message: 'Your cart is currently empty', icon: 'fas fa-info-circle',});
      this.$router.push('/shop/snacks')
      return;
    }
  },
  filters: {
    aud(x) {
      return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(x);
    }
  }
}
</script>