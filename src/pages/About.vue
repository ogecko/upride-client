<template>
  <q-page padding class="row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <img alt="Quasar logo" style="width: 100%" src="../statics/1.jpg">
      <p class="caption">
        Based on the device you are using we have detected the following settings:
      </p>
      <table class="q-table striped">
        <thead>
          <tr>
            <th class="text-left">Property</th>
            <th class="text-left">Value</th>
          </tr>
        </thead>

        <tbody>
          <tr><td>Up Ride version</td><td>1.0.1</td></tr>
          <!-- <tr><td>Touch</td><td>{{ touch }}</td></tr>
          <tr v-for="(value, prop) in $q.platform.is" :key="prop">
            <td>{{ prop }}</td>
            <td>{{ value }}</td>
          </tr> -->
        </tbody>
      </table>

    </div>
  </q-page>
</template>

<script>
export default {
  computed: {
    touch () {
      return this.$q.platform.has.touch ? 'enabled' : 'disabled'
    }
  }
}
</script>
