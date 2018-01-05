import * as types from '../mutation-types'

const state = {
  socket: {
    isConnected: false,
    message: '',
    reconnectError: false,
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
    state.message = message
  }
}

const actions = {
  closeMenu ({ commit }) {
    commit(types.CLOSE_MENU)
  },
  toggleSidebar ({ commit }, opened) {
    commit(types.TOGGLE_SIDEBAR, opened)
  },
  isToggleWithoutAnimation ({ commit }, value) {
    commit(types.TOGGLE_WITHOUT_ANIMATION, value)
  }
}

export default {
  state,
  mutations,
  actions
}
