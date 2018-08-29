<template>
  <q-page padding>
    <p>This is an cart page</p>
            <div v-for="item in cart" :key="item.name">
              {{item.count}} x {{item.name}}
            </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageCart',
  computed: {
    cart() {
      return this.$store.state.cart;
    },
  },

}
</script>