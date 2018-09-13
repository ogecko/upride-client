// Configuration for your app

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'axios',
      'feathers',
    ],
    css: [
      'app.styl'
    ],
    extras: [
      // ctx.theme.mat ? 'roboto-font' : null,
      // 'material-icons' // optional, you are not bound to it
      // 'ionicons',
      // 'mdi',
      'fontawesome'
    ],
    supportIE: false,
    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        // console.log(JSON.stringify(cfg,undefined,2));
        cfg.module.rules.push({
            test: /\.jsx?$/,
            exclude: /node_modules(\/|\\)(?!(@feathersjs))/,
            loader: 'babel-loader'
        });
        // cfg.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /(node_modules|quasar)/
        // })
      }
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: true, // opens browser window automatically
      proxy: {   // api server used when in Quasar dev mode
        '/api': {
          target: 'http://192.168.1.6:3030',    
          changeOrigin: true,
        }
      },
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QBtn',
        'QBtnGroup',
        'QField',
        'QInput',
        'QIcon',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QList',
        'QListHeader',
        'QLayout',
        'QLayoutHeader',
        'QLayoutFooter',
        'QPageContainer',
        'QPage',
        'QRouteTab',
        'QTabs',
        'QToolbar',
        'QToolbarTitle',
      ],
      directives: [
        'Ripple'
      ],
      // Quasar plugins
      plugins: [
        'Notify'
      ],
      config: {
        notify: {
          icon: 'fas fa-exclamation-triangle',
          position: 'top',
        }
      }
      // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
      // i18n: 'de' // Quasar language
    },
    // animations: 'all' --- includes all animations
    animations: [],
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        name: 'UpRide.com.au',
        short_name: 'UpRide',
        description: 'UpRide is the most convenient way to recharge and refresh while in your rideshare vehicle.',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/android-icon-72x72.png',
            'sizes': '72x72',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/android-icon-96x96.png',
            'sizes': '96x96',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/android-icon-144x144.png',
            'sizes': '144x144',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/android-icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/ms-icon-310x310.png',
            'sizes': '310x310',
            'type': 'image/png'
          },
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
