import * as types from '../mutation-types'

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
  rdata: [],
  pubData: [],
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
      console.log('Working')
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
      console.log(modifiedResult)
      return modifiedResult
    } else {
      console.log(v.type)
      return null
    }
  },
  pageviewCount: (state) => {
    return state.totalViews
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
  [types.SOCKET_ONMESSAGE] (state, message) {
    console.log(message)
    state.socket.message = message
    if (message.type === 'PageviewAggregationResultWrapper') {
      state.totalViews = message.value.data.count
    }
  },
  [types.UPDATE_PAGEVIEWS] (state, message) {
    console.log('Current', state.pageviews.current)
    // state.pageviews.past = {...state.pageviews.current}
    // state.pageviews.current = message
    // console.log('New', state.pageviews.current)
  },
  [types.RESET_COUNT] (state) {
    state.timerCount = 0
  },
  [types.INCREMENT_COUNT] (state) {
    state.timerCount += 1
  }
}

const actions = {
  pageviewUpdate ({ commit, state }, message) {
    commit(types.UPDATE_PAGEVIEWS, {
      message: message
    })
  },
  testChange ({ commit }) {
    alert('Hello Kevin' + '!')

    commit(types.UPDATE_PAGEVIEWS, {
      message: {}
    })
  },
  testChange2 ({ commit }) {
    alert('Hello Deezy' + '!')

    commit(types.UPDATE_PAGEVIEWS, {
      message: {}
    })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
