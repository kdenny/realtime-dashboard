import * as types from '../../mutation-types'
//
// const state = {
//   socket: {
//     isConnected: false,
//     message: '',
//     reconnectError: false
//   },
//   pageviews: {
//     current: {},
//     previous: {}
//   },
//   totalViews: 0,
//   computedStats: {},
//   rdata: [],
//   pubData: {},
//   timerCount: 0
// }
//
// const baseUrl = 'ws://172.31.22.33:9105/wsApp/'
// const defaultRefresh = 1000
//
//
// const mutations = {
//   [types.SOCKET_ONOPEN] (state, event) {
//     state.socket.isConnected = true
//   },
//   [types.SOCKET_ONCLOSE] (state, event) {
//     state.socket.isConnected = false
//   },
//   [types.SOCKET_ONERROR] (state, event) {
//     console.error(state, event)
//   },
//   [types.SOCKET_ONMESSAGE] (state, message) {
//     state.socket.message = message
//     if (message.type === 'PageviewAggregationResultWrapper') {
//       state.totalViews = message.value.data.count
//       state.pubData = message.value.data
//       state.pubData.user.values.forEach(uf => {
//         if (uf.LOGIN) {
//           state.computedStats.loggedIn = Math.round((uf.LOGIN / state.totalViews) * 1000) / 10
//         }
//       })
//       state.pubData.adBlock.values.forEach(ua => {
//         if (ua.OFF) {
//           state.computedStats.adblock = Math.round((ua.OFF / state.totalViews) * 1000) / 10
//         }
//       })
//     }
//   },
//   [types.UPDATE_PAGEVIEWS] (state, message) {
//     // console.log('Current', state.pageviews.current)
//     // state.pageviews.past = {...state.pageviews.current}
//     // state.pageviews.current = message
//     // console.log('New', state.pageviews.current)
//   },
//   [types.RESET_COUNT] (state) {
//     state.timerCount = 0
//   },
//   [types.INCREMENT_COUNT] (state) {
//     state.timerCount += 1
//   }
// }
//
// const actions = {
//   openSocket ({ commit, state }, url) {
//     // commit(types.UPDATE_PAGEVIEWS, {
//     //   message: message
//     // })
//   },
//   testChange ({ commit }) {
//     alert('Hello Kevin' + '!')
//
//     commit(types.UPDATE_PAGEVIEWS, {
//       message: {}
//     })
//   },
//   testChange2 ({ commit }) {
//     alert('Hello Deezy' + '!')
//
//     commit(types.UPDATE_PAGEVIEWS, {
//       message: {}
//     })
//   }
// }
//
// export default {
//   state,
//   mutations,
//   getters,
//   actions
// }

export default function createWebSocketPlugin (socket) {
  return store => {
    socket.on('message', data => {
      store.commit(types.UPDATE_DATA, data)
    })
    // store.subscribe(mutation => {
    //   if (mutation.type === 'UPDATE_DATA') {
    //     socket.emit('update', mutation.payload)
    //   }
    // })
  }
}
