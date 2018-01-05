import lazyLoading from './lazyLoading'

export default {
  name: 'Composer',
  meta: {
    expanded: false,
    title: 'menu.composer',
    iconClass: 'vuestic-icon vuestic-icon-statistics'
  },

  children: [
    {
      name: 'menu.charts',
      path: '/statistics/charts',
      component: lazyLoading('statistics/charts/Charts'),
      meta: {
        // title: 'menu.charts'
        title: 'menu.experiences'
      }
    },
    {
      name: 'menu.progressBars',
      path: '/statistics/progress-bars',
      component: lazyLoading('statistics/progress-bars/ProgressBars'),
      meta: {
        // title: 'menu.progressBars'
        title: 'menu.flow'
      }
    }
  ]
}
