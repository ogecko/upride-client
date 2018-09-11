<template>
  <q-page padding>
      <StoreMenu />
      <p class="text-align-center q-body-2 q-mt-md">
        UpRide is the most convenient way to recharge and refresh while in your rideshare vehicle. 
        Simply purchase what you desire below, and your driver will hand it to you when safe to do so.
      </p>
      <p class="text-align-center">
        Your Driver: {{$store.state.driver.name}}
      </p>
      <div class="row"><div class="col-12 q-pt-sm bg-black"></div>
      </div>
      <StoreItem
        v-for="(item, index) in products"
        :key="index"
        :item="item"
        :index="index"
      />
  </q-page>
</template>


<style scoped>
  .text-align-center {
    text-align: center;
  }
</style>

<script>
      // Alternate selection for categories
      // <div class="row justify-center">
      //   <q-btn class='col-5 q-ma-xs' color='secondary' label='Snacks &amp; Drinks' @click='$router.push("/shop/snacks")'/>
      //   <q-btn class='col-5 q-ma-xs' color='secondary' label='Free Samples' @click='$router.push("/shop/samples")'/>
      //   <q-btn class='col-5 q-ma-xs' color='secondary' label='Electronics' @click='$router.push("/shop/electronics")'/>
      //   <q-btn class='col-5 q-ma-xs' color='secondary' label='Personal Care' @click='$router.push("/shop/personal")'/>
      // </div>


import StoreItem from '../components/StoreItem.vue';
import StoreMenu from '../components/StoreMenu.vue';
export default {
  components: {
    StoreItem, StoreMenu,
  },
  name: 'PageHome',
  props: {
    category: { type: 'string' },
  },
  beforeMount() {
    if (this.$store.state.products==0) {
      this.$q.notify({ message: 'Please choose a driver code first'});
      this.$router.push('/driver')
    }
  },
  computed: {
    products() {
      if (this.$route.params.category) {
        return this.$store.state.products.filter(item => item.category == this.$route.params.category);
      } else {
        return this.$store.state.products
      }
    },
  },
  methods: {
  },
}
</script>
