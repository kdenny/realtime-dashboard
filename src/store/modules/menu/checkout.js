import lazyLoading from './lazyLoading'

export default {
  name: 'Checkout',
  meta: {
    expanded: false,
    title: 'menu.checkout',
    iconClass: 'vuestic-icon vuestic-icon-statistics'
  },

  children: [
    {
      name: 'menu.charts',
      path: '/statistics/charts',
      component: lazyLoading('statistics/charts/Charts'),
      meta: {
        title: 'menu.sourcing'
      }
    },
    {
      name: 'menu.progressBars',
      path: '/statistics/progress-bars',
      component: lazyLoading('statistics/progress-bars/ProgressBars'),
      meta: {
        title: 'menu.checkoutExp'
      }
    },
    {
      name: 'menu.progressBars',
      path: '/statistics/progress-bars',
      component: lazyLoading('statistics/progress-bars/ProgressBars'),
      meta: {
        title: 'menu.purchase'
      }
    }
  ]
}
