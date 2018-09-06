<template>
  <div>
    <div class="row q-mt-md justify-center">
    <q-btn class='q-mx-xs text-weight-bold keypad-key' outline  size="lg" :label='code[0]' @click='setIndex(0)'/>
    <q-btn class='q-mx-xs text-weight-bold keypad-key' outline  size="lg" :label='code[1]' @click='setIndex(1)'/>
    <q-btn class='q-mx-xs text-weight-bold keypad-key' outline  size="lg" :label='code[2]' @click='setIndex(2)'/>
    <q-btn class='q-mx-xs text-weight-bold keypad-key' outline  size="lg" :label='code[3]' @click='setIndex(3)'/>
    </div>
    <div class="q-mb-lg">
      <small >{{labelMsg}}</small>
    </div>
    <div class="gutter-xs">
    <div class="row justify-center">
        <q-btn class='q-mx-xs keypad-key' color='secondary' size="lg" label='7' @click='setCode(7)'/>
        <q-btn class='q-mx-xs keypad-key' color='secondary' size="lg" label='8' @click='setCode(8)'/>
        <q-btn class='q-mx-xs keypad-key' color='secondary' size="lg" label='9' @click='setCode(9)'/>
    </div>
    <div class="row justify-center">
        <q-btn class='q-mx-xs keypad-key' color='secondary' size="lg" label='4' @click='setCode(4)'/>
        <q-btn class='q-mx-xs keypad-key' color='secondary' size="lg" label='5' @click='setCode(5)'/>
        <q-btn class='q-mx-xs keypad-key' color='secondary' size="lg" label='6' @click='setCode(6)'/>
    </div>
    <div class="row justify-center">
        <q-btn class='q-mx-xs keypad-key' color='secondary' size="lg" label='1' @click='setCode(1)'/>
        <q-btn class='q-mx-xs keypad-key' color='secondary' size="lg" label='2' @click='setCode(2)'/>
        <q-btn class='q-mx-xs keypad-key' color='secondary' size="lg" label='3' @click='setCode(3)'/>
    </div>
    <div class="row justify-center">
        <q-btn class='q-mx-xs keypad-key' color='secondary' size="lg" label='0' @click='setCode(0)'/>
        <q-btn class='q-mx-xs keypad-key' color='secondary' size="lg" label='Clear' @click='clearCode()'/>
        <q-btn class='q-mx-xs keypad-key' color='secondary' size="lg" label='Enter' @click='enterCode()'/>
    </div>
    </div>
  </div>
</template>

<style scoped>
  div {
    text-align: center;
  }
</style>

<script>
export default {
  name: 'FieldKeypad',
  props: {
    value: { type: String, default: '    ' },
    labelMsg: { type: String, default: '' },
  },
  data() {
    return {
      code: this.value,
      codeIndex: 0,
    }
  },
  methods: {
    clearCode() {
      this.code = '    ';
      this.codeIndex = 0;
    },
    setCode(newVal) {
      this.code = this.codeIndex>this.code.length-1 ? this.code :
                  this.code.substr(0,this.codeIndex) + newVal + this.code.substr(this.codeIndex+1);
      this.codeIndex = (this.codeIndex+1) % 4;
    },
    setIndex(newVal) {
      this.codeIndex = newVal;
    },
    enterCode(newVal) {
      this.$emit('input', this.code);
    },
  }
}
</script>
