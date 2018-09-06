<template>
  <q-page padding>
    <div>
      <h2 class="text-align-center text-weight-bold q-my-xs">Welcome!</h2>
      <p class="q-mb-xl">Please enter your drivers code to see the menu.</p>
    </div>
    <FieldKeypad labelMsg='Where do I find the code?' @input="newDriver"/>
  </q-page>
</template>

<style scoped>
  div {
    text-align: center;
  }
</style>

<script>
import FieldKeypad from '../components/FieldKeypad.vue'
import driverData from '../data/drivers.js'

export default {
  name: 'PageDriver',
  components: {
    FieldKeypad,
  },
  data() {
    return {
      driverCode: { type: String, default: '    ' },
      driverCodeIndex: { type: Number, default: 0 },
    }
  },
  methods: {
    newDriver(code) {
      /* check for a 4 digit code */
      if (! /\d{4}/.test(code)) {
        this.$q.notify({ message: 'Please enter a 4 digit code'});
        return;
      }
      /* check for a valid driver code */
      if (!driverData[code]) {
        this.$q.notify({ message: 'Please check code with the driver'});
        return;
      }
      console.log(`New driver: '${code}', '${driverData[code].name}'`);
      this.$store.commit('setDriver', { code, name: driverData[code].name });

      this.$axios.get('statics/products.json', { responseType: 'json' })
        .then(response => this.$store.commit('setProducts', response.data))
        .then(() => this.$router.push('/shop/snacks') )
        .catch(() => this.$q.notify({ message: 'Invalid Driver Code' }) );
    }
  }
}
</script>
