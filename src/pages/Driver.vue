<template>
  <q-page padding>
    <div>
      <h1 class="q-my-md">Welcome!</h1>
      <big>Please enter your drivers code to see the menu.</big>
    </div>
    <FieldKeypad message='Where do I find the code?'/>
  </q-page>
</template>

<style scoped>
  div {
    text-align: center;
  }
</style>

<script>
import FieldKeypad from '../components/FieldKeypad.vue'

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

  }
}
</script>
