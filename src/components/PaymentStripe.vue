<template>
<div>
  <div class="row">
    <div class="col-6">
    </div>
    <div class="col-6 row">
      <q-btn class="col-12 q-mt-md" :disabled="isDisabled" color="black" size="lg" @click="pay()">Pay Now</q-btn>
      <div class="col-12 q-mt-xl text-grey text-center">Payment Options</div>
      <div class="col-12 text-center">
        <q-icon class="q-ml-xs" name="fab fa-cc-visa" color="grey" size="2rem"/>
        <q-icon class="q-ml-xs" name="fab fa-cc-mastercard" color="grey" size="2rem"/>
        <q-icon class="q-ml-xs" name="fab fa-cc-amex" color="grey" size="2rem"/>
        <q-icon class="q-ml-xs" name="fab fa-cc-diners-club" color="grey" size="2rem"/>
      </div>
    </div>
  </div>


</div>
</template>

<script>

export default {
  props: {
    amount: { type: [Number, String], default: '0.00' },
  },
  data() {
    return {
      handler: undefined,
      isComplete: false,
      stripeEmail: '',
      stripeToken: ''
    };
  },
  computed: {
    isDisabled() {
      return (this.$store.state.cartTotal<1);
    }
  },
  beforeMount() {
    const self = this;
    this.handler = StripeCheckout.configure({
      key: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
      image: 'statics/icons/android-icon-192x192.png',
      locale: 'auto',
      token: function(token) {
        if (self) {
          console.log('Token received from STRIPE');
          self.$store.commit('clearCartContents', token);
          self.$router.push('/about');
        }
      }
    });
  },
  beforeDestroy() {
    this.handler.close();
  },
  methods: {
    pay() {
      this.handler.open({
        name: 'UpRide.com.au',
        description: 'Recharge while in your rideshare',
        zipCode: false,
        amount: this.amount * 100,
      });
    }
  }
};
</script>

