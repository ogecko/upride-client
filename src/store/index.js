import Vue from 'vue'
import Vuex from 'vuex'

import example from './module-example'
import shop from './shop.js'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    ...shop,
    modules: {
      example,
    }
  })

  return Store
}
