
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Driver.vue') },
      { path: '/shop/:category?', component: () => import('pages/Shop.vue') },
      { path: '/checkout', component: () => import('pages/Checkout.vue') },
      { path: '/driver', component: () => import('pages/Driver.vue') },
      { path: '/about', component: () => import('pages/About.vue') },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
