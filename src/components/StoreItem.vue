<template>
  <div>
        <img class="q-mt-lg"  :alt="item.name" style="width: 80%" :src="'statics/'+this.item.image">
        <p class="text-weight-bold q-my-xs">{{ item.name }}</p>
        <p class="q-body-2 q-my-none">{{ item.description }}</p>
        <q-btn class="q-title">{{ item.price | aud }}</q-btn>
        <q-btn-group>
          <q-btn color="secondary" @click="del()"><q-icon name="fas fa-minus" size="0.8rem"/></q-btn>
          <q-btn outline>{{count}}</q-btn>
          <q-btn color="secondary" @click="add()"><q-icon name="fas fa-plus" size="0.8rem"/></q-btn>
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
</style>

<script>
export default {
  name: 'StoreItem',
  props: {
    item: { type: Object },
  },
  computed: {
    count() {
      return this.$store.getters.getCartCount(this.item.name);
    }
  },
  methods: {
    add() {
      this.$store.commit('addItem', this.item);
    },
  },
  filters: {
    aud(x) {
      return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(x);
    }
  },
}
</script>