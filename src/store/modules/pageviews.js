import * as types from '../mutation-types'
// import createWebSocketPlugin from '../modules/websocket/wsPlugin'
export const strict = false
const state = {
  socket: {
    isConnected: false,
    message: '',
    reconnectError: false
  },
  pageviews: {
    current: {},
    previous: {}
  },
  totalViews: 0,
  computedStats: {},
  rdata: [],
  app: 'pageviews',
  client: 'o19WonOrHQ',
  iSocket: {},
  pubData: {},
  fullData: {},
  timerCount: 0
}

const datasets = ['user', 'adBlock', 'topUrl', 'author', 'contentSection', 'userAgent.platform', 'userAgent.operatingSystem', 'userAgent.browser', 'geoData.country', 'geoData.region', 'geoData.city', 'referrer', 'rawReferrer']
const reformat = function (data) {
  let newData = {}

  datasets.forEach(function (dataset) {
    let fields = dataset.split('.')
    let values = []
    if (fields.length === 2) {
      values = data.value.data[fields[0]][fields[1]].values
    } else {
      values = data.value.data[dataset].values
    }
    let rank = 1
    newData[dataset] = values.map(function (element) {
      let obj = {}
      for (var p in element) {
        obj.id = p
        obj.count = element[p]
      }
      obj.rank = rank++
      return obj
    })
  })
//        console.log("Formatted data", newData);
  return newData
}

const calcDiffs = function () {
  datasets.forEach(function (dataset) {
    var oldValues = state.rdata.results[0][dataset]
    var newValues = state.rdata.results[1][dataset]
    newValues.forEach(function (newRecord) {
      var oldRecord = oldValues.find(function (oldRecord) {
        if (newRecord.id === oldRecord.id) {
          return oldRecord
        }
      })
      if (oldRecord) {
        newRecord.diff = (newRecord.count - oldRecord.count)
        newRecord.rankDiff = -(newRecord.rank - oldRecord.rank)
      } else {
        newRecord.diff = 0
        newRecord.rankDiff = 0
      }
    })
  })
}

const getters = {
  formattedResult: (state) => {
    let v = {...state.socket.message}
    console.log(v)
    if (v.type === 'PageviewAggregationResultWrapper') {
      // console.log('Working')
      const modifiedResult = reformat(v)

      if (state.rdata.results) {
        // //always keep the first entry
        if (state.rdata.results.length > 1) {
          state.rdata.results.pop()
        }
        state.rdata.results.push(modifiedResult)
        if (state.rdata.results.length === 2) {
          calcDiffs()
        }
      } else {
        state.rdata.results = [modifiedResult]
      }

      // Finally set the data back into the model
      // state.pubData = modifiedResult
      // console.log(modifiedResult)
      return modifiedResult
    } else {
      console.log(v.type)
      return null
    }
  },
  pageviewCount: (state) => {
    return state.totalViews
  },
  statCards: (state) => {
    return state.computedStats
  }

}

const mutations = {
  [types.SOCKET_ONOPEN] (state, event) {
    state.socket.isConnected = true
  },
  [types.SOCKET_ONCLOSE] (state, event) {
    state.socket.isConnected = false
  },
  [types.SOCKET_ONERROR] (state, event) {
    console.error(state, event)
  },
  [types.OPEN_SOCKET] (state, socket) {
    console.log('Opening')
    // let url = 'ws://172.31.22.33:9105/wsApp/' + state.client
    state.iSocket = socket
    // state.iSocket.addEventListener('message', function (e) {
    //   var message = JSON.parse(e.data)
    //   state.socket.message = message
    //   if (message.type === 'PageviewAggregationResultWrapper') {
    //     state.totalViews = message.value.data.count
    //     state.pubData = message.value.data
    //     state.pubData.user.values.forEach(uf => {
    //       if (uf.LOGIN) {
    //         state.computedStats.loggedIn = Math.round((uf.LOGIN / state.totalViews) * 1000) / 10
    //       }
    //     })
    //     state.pubData.adBlock.values.forEach(ua => {
    //       if (ua.OFF) {
    //         state.computedStats.adblock = Math.round((ua.OFF / state.totalViews) * 1000) / 10
    //       }
    //     })
    //   }
    // })
  },
  [types.SOCKET_ONMESSAGE] (state, message) {
    state.socket.message = message
    if (message.type === 'PageviewAggregationResultWrapper') {
      state.totalViews = message.value.data.count
      state.pubData = message.value.data
      state.pubData.user.values.forEach(uf => {
        if (uf.LOGIN) {
          state.computedStats.loggedIn = Math.round((uf.LOGIN / state.totalViews) * 1000) / 10
        }
      })
      state.pubData.adBlock.values.forEach(ua => {
        if (ua.OFF) {
          state.computedStats.adblock = Math.round((ua.OFF / state.totalViews) * 1000) / 10
        }
      })
    }
  },
  [types.UPDATE_DATA] (state, message) {
    state.socket.message = message
    if (message.type === 'PageviewAggregationResultWrapper') {
      state.totalViews = message.value.data.count
      state.pubData = message.value.data
      state.pubData.user.values.forEach(uf => {
        if (uf.LOGIN) {
          state.computedStats.loggedIn = Math.round((uf.LOGIN / state.totalViews) * 1000) / 10
        }
      })
      state.pubData.adBlock.values.forEach(ua => {
        if (ua.OFF) {
          state.computedStats.adblock = Math.round((ua.OFF / state.totalViews) * 1000) / 10
        }
      })
    }
  },
  [types.RESET_COUNT] (state) {
    state.timerCount = 0
  },
  [types.INCREMENT_COUNT] (state) {
    state.timerCount += 1
  }
}

const actions = {
  updateData ({ commit, state }, message) {
    commit(types.UPDATE_DATA, {
      message: message
    })
  },
  openSocket ({ commit, state }) {
    let url = 'ws://172.31.22.33:9105/wsApp/' + state.client
    let iSocket = new WebSocket(url)
    commit(types.OPEN_SOCKET, {
      socket: iSocket
    })
    iSocket.addEventListener('message', function (e) {
      var message = JSON.parse(e.data)
      console.log(message)
      commit(types.UPDATE_DATA, {
        message: message
      })
    })
  },
  testChange ({ commit }) {
    alert('Hello Kevin' + '!')

    // commit(types.UPDATE_PAGEVIEWS, {
    //   message: {}
    // })
  },
  testChange2 ({ commit }) {
    alert('Hello Deezy' + '!')

    // commit(types.UPDATE_PAGEVIEWS, {
    //   message: {}
    // })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
