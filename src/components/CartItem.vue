<template>
  <div class="row q-my-xs items-center">
    <div class="col-1">{{item.count}}&nbsp;x</div>
    <div class="col-7 ">{{item.name}}</div>
    <div class="col-3 text-right">{{item.price | aud}}</div>
    <div class="col-1 text-center"><q-btn size='sm' @click="clr()" icon="fas fa-trash" flat round/></div>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    item: { type: Object },
  },
  methods: {
    clr() {
      this.$store.commit('clearItemFromCart', this.item);
    },
  },
  filters: {
    aud(x) {
      return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(x);
    }
  },
}
</script>