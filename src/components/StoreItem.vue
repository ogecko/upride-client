<template>
  <div class="col-xs-12 col-md-6 col-xl-4">
        <img class="product q-mt-lg"  @click="inc()" :alt="item.name" style="width: 70%" :src="'statics/'+this.item.image">
        <p class="text-weight-bold q-my-xs">{{ item.name }}</p>
        <p class="q-body-2 q-my-none">{{ item.description }}</p>
        <q-btn class="q-title">{{ item.price | aud }}</q-btn>
        <q-btn-group>
          <q-btn color="secondary" @click="dec()"><q-icon name="fas fa-minus" size="0.8rem"/></q-btn>
          <q-btn outline @click="clr()">{{count}}</q-btn>
          <q-btn color="secondary" @click="inc()"><q-icon name="fas fa-plus" size="0.8rem"/></q-btn>
        </q-btn-group>        

  </div>
</template>

<style lang="stylus" scoped>
  i.q-icon {
    font-size: 0.5rem;
  }
  div {
    text-align: center;
  }
  img.product {
    max-width: 300px;
  }
</style>

<script>
export default {
  name: 'StoreItem',
  props: {
    item: { type: Object },
  },
  computed: {
    count() {
      return this.$store.getters.getCartItemCount(this.item.name);
    }
  },
  methods: {
    dec() {
      this.$store.commit('decItemFromCart', this.item);
    },
    clr() {
      this.$store.commit('clearItemFromCart', this.item);
    },
    inc() {
      this.$store.commit('addItemToCart', this.item);
    },
  },
  filters: {
    aud(x) {
      return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(x);
    }
  },
}
</script>