<template>
    <div class="">
        <div class="row justify-center text-center">
            <div class="col-5 q-pt-sm bg-black text-weight-bold text-white">
                Tip your driver?
            </div>
        </div>
        <div class="row justify-center text-center">
            <div class="col-5 q-py-sm bg-black text-weight-bold text-black">
                <q-btn-group>
                <q-btn color="secondary" @click="dec()"><q-icon name="fas fa-minus" size="0.8rem"/></q-btn>
                <q-btn class="bg-white" outline @click="clr()">${{count}}</q-btn>
                <q-btn color="secondary" @click="inc()"><q-icon name="fas fa-plus" size="0.8rem"/></q-btn>
                </q-btn-group>        
            </div>
        </div>
        <div class="row">
            <div class="col-12 q-pt-sm bg-black">
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CartTip',
  data() {
    return {
        item: { "category": "tip", "sku": "TIP-1", "price": 1.00, "name": "Driver tip", "description": "", "image": "" },
    }
  },
  computed: {
    count() {
      return this.$store.getters.getCartItemPrice(this.item.name);
    }
  },
  methods: {
    dec() {
      this.$store.commit('decItemPriceFromCart', this.item);
    },
    clr() {
      this.$store.commit('clearItemFromCart', this.item);
    },
    inc() {
      this.$store.commit('addItemPriceToCart', this.item);
    },
  },
  filters: {
    aud(x) {
      return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(x);
    }
  },
}
</script>