<template>
  <q-page padding>
    <h3 class="text-align-center text-weight-bold q-my-xs">Checkout</h3>
            <div v-for="item in cart" :key="item.name" class="row q-my-xs">
              <div class="col-1">{{item.count}}&nbsp;x</div>
              <div class="col-8">{{item.name}}</div>
              <div class="col-3 text-right">{{item.price | aud}}</div>
            </div>
            <div class="row q-my-xs text-weight-bold">
              <div class="col-9  text-right">Total Due:</div>
              <div class="col-3  text-right">{{amount | aud}}</div>
            </div>
            
  </q-page>
</template>


<style scoped>
  .text-align-center {
    text-align: center;
  }
</style>

<script>
export default {
  name: 'PageCart',
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    amount() {
      return this.$store.getters.getCartAmount();
    },
  },
  filters: {
    aud(x) {
      return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(x);
    }
  }
}
</script>