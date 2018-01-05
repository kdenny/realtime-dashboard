import lazyLoading from './lazyLoading'

export default {
  name: 'Pageviews2',
  meta: {
    expanded: false,
    title: 'menu.pageviews',
    iconClass: 'vuestic-icon vuestic-icon-maps'
  },

  children: [
    {
      name: 'GoogleMaps',
      path: '/maps/google-maps',
      component: lazyLoading('maps/google-maps/GoogleMapsPage'),
      meta: {
        title: 'Content'
      }
    },
    {
      name: 'LeafletMaps',
      path: '/maps/leaflet-maps',
      component: lazyLoading('maps/leaflet-maps/LeafletMapsPage'),
      meta: {
        title: 'User Agent'
      }
    },
    {
      name: 'BubbleMaps',
      path: '/maps/bubble-maps',
      component: lazyLoading('maps/bubble-maps/BubbleMapsPage'),
      meta: {
        title: 'Geography'
      }
    },
    {
      name: 'LineMaps',
      path: '/maps/line-maps',
      component: lazyLoading('maps/line-maps/LineMapsPage'),
      meta: {
        title: 'Referrer'
      }
    }
  ]
}
