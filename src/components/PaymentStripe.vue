<template>
  <div class="q-mt-lg">
    <q-input v-model="fields.name" stack-label="Name" :before="[{icon: 'fas fa-user', handler () {}}]" />
    <q-input v-model="fields.email" type="email" stack-label="Email" :before="[{icon: 'fas fa-envelope', handler () {}}]" />
    <q-input v-model="fields.mobile" type="tel" stack-label="Mobile" :before="[{icon: 'fas fa-phone', handler () {}}]" />
    <div v-if="!isFree" class="q-mt-sm q-ml-lg q-caption text-faded">Payment Details</div>
      <Card v-if="!isFree && isKeyLoaded" class='stripecard q-mt-none'
        :class='{ complete }'
        :stripe='settings.publishable_key'
        :options='stripeOptions'
        @change='complete = $event.complete'
      />

    <div class="row">
      <div class="col-6">
      </div>
      <div class="col-6 row">
        <q-btn class="col-12 q-mt-md" :disabled="isDisabledPay" color="black" size="lg" @click="payNow()">{{payBtnLabel}}</q-btn>
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

import { Card, createToken, baseStyle } from 'vue-stripe-elements-plus'
delete baseStyle.base.lineHeight;       // to stop warning from stripe about not setting line-height

export default {
  components: {
    Card,
  },
  props: {
    amount: { type: [Number, String], default: '0.00' },
  },
  data() {
    return {
      settings: { mode: 'test', publishable_key: 'unknown' },      // settings from the api { mode: 'live'|'test', publishable_key: 'xxx' }
      stripeOptions: { },
      complete: false,    // marks whether the CC is complete (ie fully filled out)
      fields: { name: '', email: '',  mobile: '' },
    };
  },
  created() {
    this.$api.service('/api/settings').get('stripe')
      .then(data => this.settings={ ...data })
      .catch(err => this.$q.notify({ message: err.message}))
  },
  computed: {
    isKeyLoaded() {
      return (this.settings.publishable_key!='unknown')
    },
    isTestMode() {
      return (this.settings.mode=='test')
    },
    isEmpty() {
      return (this.$store.state.cartTotal<1);
    },
    isFree() {
      return (this.amount==0);
    },
    isFormComplete() {
      return (!!this.fields.name && !!this.fields.email && (this.isFree || this.complete))
    },
    isDisabledPay() {
      return (this.isEmpty || !this.isFormComplete);
    },
    payBtnLabel() {
      return this.isFree ? 'Claim' : 'Pay Now'
    },
  },
  methods: {
    payNow() {
      console.log('Pay Now')
      if (this.isFree) {
        this.processSaleOrder();
      } else {
        createToken().then(data => data.token ?
          this.processSaleOrder(data.token)
          : this.$q.notify({ message: data.error.message})
        );
      }
    },
    processSaleOrder(token={ card: {} }) {
      const saleOrder = {
        totalAmount: this.$store.getters.getCartAmount(),
        cart: { ...this.$store.state.cart },     // { item1, item2, ... } where item = { name, description, category, sku, count, price }
        seller: { ...this.$store.state.driver }, // name, email, mobile, code
        buyer: { ...this.fields },               // name, email, mobile
        token: { 
          token_id: token.id,
          card_id: token.card.id,
          card_last4: token.card.last4, 
          client_ip: token.client_ip,
          livemode: token.livemode,               // true / false
          used: token.used,                       // true / false
        }
      };
      this.$api.service('/api/sale-order').create(saleOrder)
        .then(data => { 
          this.$store.commit('clearCartContents', saleOrder);
          this.$router.push('/about');
        })
        .catch(err => {
          this.$q.notify({ message: err.message})
        });
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