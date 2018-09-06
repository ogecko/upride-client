import Vue from 'vue'
import Vuex from 'vuex'

import shop from './shop.js'
import driver from './driver.js'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    ...shop,
    modules: {
      driver,
    }
  })

  return Store
}
