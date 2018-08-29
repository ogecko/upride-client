<template>
  <q-page padding>
    <h3 class="text-align-center text-weight-bold q-my-xs">Checkout</h3>
            <div v-for="item in cart" :key="item.name">
              {{item.count}} x {{item.price | aud}} {{item.name}}
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
  },
  filters: {
    aud(x) {
      return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(x);
    }
  }
}
</script>