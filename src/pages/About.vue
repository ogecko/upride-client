<template>
  <q-page padding>
    <div v-if="isPaymentComplete">
      <h2 class="text-align-center text-weight-bold">Order Complete</h2>
      <div class="q-my-md"><q-icon size="60px" name="fas fa-check-circle" /></div>
      <p class="q-display-1">Thank You.</p>
      <p class="q-title q-my-md">
        Your driver will be notified and will hand your items over when safe to do so.
      </p>
      <p class="q-title q-my-xl">We hope we've Up'd your Ride.</p>
    </div>
    <div v-else>
      <h2 class="text-align-center text-weight-bold">UpRide.com.au</h2>
      <p class="text-align-center q-my-lg">
        UpRide is the most convenient way to recharge and refresh while in your rideshare vehicle. 
        Simply purchase what you desire from the online shop, and your driver will hand it to you when safe to do so.
      </p>
      <div class="row q-my-md justify-center items-center">
        <div class="col-4">UpRide Version</div>
        <div class="col-3">{{ version }}</div>
      </div>
      <div class="row q-my-md justify-center items-center">
        <div class="col-4">Number of Products</div>
        <div class="col-3">{{$store.state.products.length}}</div>
      </div>
      <div class="row q-my-md justify-center items-center">
        <div class="col-4">Your Driver</div>
        <div class="col-3">{{$store.state.driver.name}}</div>
      </div>

    </div>
  </q-page>
</template>

<style scoped>
  div {
    text-align: center;
  }
</style>

<script>
import settings from '../../package.json'
export default {
  computed: {
    isPaymentComplete() {
      return !!this.$store.state.saleOrder.buyer;
    },
    version() {
      return settings.version;      
    }

  }
}
</script>
