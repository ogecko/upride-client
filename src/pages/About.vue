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
      <p class="text-align-center q-mt-md">
        UpRide is the most convenient way to recharge and refresh while in your rideshare vehicle. 
        Simply purchase what you desire from the online shop, and your driver will hand it to you when safe to do so.
      </p>
      <div class="row justify-center">
        <div class="col-2">Version</div>
        <div class="col-2">1.0.1</div>
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
export default {
  computed: {
    isPaymentComplete() {
      return !!this.$store.state.cartToken.name;
    }
  }
}
</script>
