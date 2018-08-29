<template>
  <q-page padding>
    <div>
      <h2 class="text-align-center text-weight-bold">Order Complete</h2>
      <div class="q-my-md"><q-icon size="60px" name="fas fa-check-circle" /></div>
      <p class="q-display-1">Thank You.</p>
      <p class="q-title q-my-md">
        Your driver will be notified and will hand your items over when safe to do so.
      </p>
      <p class="q-title q-my-xl">We hope we've Up'd your Ride.</p>
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
    touch () {
      return this.$q.platform.has.touch ? 'enabled' : 'disabled'
    }
  }
}
</script>
