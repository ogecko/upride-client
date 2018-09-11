<template>
  <div class="q-mt-lg">
    <q-input v-model="fields.name" stack-label="Name" :before="[{icon: 'fas fa-user', handler () {}}]" />
    <q-input v-model="fields.email" type="email" stack-label="Email" :before="[{icon: 'fas fa-envelope', handler () {}}]" />
    <q-input v-model="fields.mobile" type="number" stack-label="Mobile" :before="[{icon: 'fas fa-phone', handler () {}}]" />
    <div v-if="!isFree" class="q-mt-sm q-ml-lg q-caption text-faded">Payment Details</div>
      <Card v-if="!isFree" class='stripecard q-mt-none'
        :class='{ complete }'
        :stripe='stripeKey'
        :options='stripeOptions'
        @change='complete = $event.complete'
      />

    <div class="row">
      <div class="col-6">
      </div>
      <div class="col-6 row">
        <q-btn class="col-12 q-mt-md" :disabled="isDisabledPay" color="black" size="lg" @click="pay()">{{payBtnLabel}}</q-btn>
        <div class="col-12 q-mt-xl text-secondary text-center">Payment Options</div>
        <div class="col-12 text-center">
          <q-icon class="q-ml-xs" name="fab fa-cc-visa" color="secondary" size="2rem"/>
          <q-icon class="q-ml-xs" name="fab fa-cc-mastercard" color="secondary" size="2rem"/>
          <q-icon class="q-ml-xs" name="fab fa-cc-amex" color="secondary" size="2rem"/>
          <q-icon class="q-ml-xs" name="fab fa-cc-diners-club" color="secondary" size="2rem"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { Card, createToken } from 'vue-stripe-elements-plus'

export default {
  components: {
    Card,
  },
  props: {
    amount: { type: [Number, String], default: '0.00' },
  },
  data() {
    return {
      stripeKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
      stripeOptions: { },
      complete: false,    // marks whether the CC is complete (ie fully filled out)
      fields: { name: '', email: '',  mobile: '' },
    };
  },
  computed: {
    isEmpty() {
      return (this.$store.state.cartTotal<1);
    },
    isFree() {
      return (this.amount==0);
    },
    isFormComplete() {
      return (!!this.fields.name && !!this.fields.email && !!this.fields.mobile && (this.isFree || this.complete))
    },
    isDisabledPay() {
      return (this.isEmpty || !this.isFormComplete);
    },
    payBtnLabel() {
      return this.isFree ? 'Claim' : 'Pay Now'
    },
  },
  methods: {
    pay() {
      console.log('pay')
      const self = this;
      if (this.isFree) {
        self.$store.commit('clearCartContents', { ...self.fields });
        self.$router.push('/about');
      } else {
        createToken().then(data => {
          if (data.token) {
            self.$store.commit('clearCartContents', { ...data.token, ...self.fields });
            self.$router.push('/about');
          } else {
            console.log('Stripe Error Returned', data.error);
          }
        })
      }
    }
  }
};
</script>

<style lang="stylus">
	.stripecard
		background-color: white
		height: 40px
		padding: 8px
		border-bottom: 1px solid #bbb
	.stripecard::focus
		border-bottom: 2px solid @black
	.stripecard--invalid
		border-color: transparent
	.stripecard--webkit-autofill
		background-color: #fefde5 !important
</style>