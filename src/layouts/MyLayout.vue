<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header reveal>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >

        <q-toolbar-title>
        <img alt="Quasar logo" style="height: 55px" src="../assets/logo-small.png">
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

  <q-layout-footer>
      <q-tabs inverted>
        <q-route-tab
          label="Driver" icon="fas fa-taxi" slot="title"
          to="/driver" exact
        />
        <q-route-tab
          label="Shop" icon="fas fa-home" slot="title"
          to="/shop" exact
        />
        <q-route-tab :count="cartTotal"
          label="Checkout" icon="fas fa-shopping-cart" slot="title"
          to="/checkout" exact
        />
        <q-route-tab
          label="About" icon="fas fa-info" slot="title"
          to="/about" exact
        />
      </q-tabs>
    </q-layout-footer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  computed: {
    cartTotal () {
      return this.$store.state.cartTotal
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
