import { RedState, YellowState, GreenState } from './state.mjs'

class StatePool {
    constructor(context) {
        this.state = {
            red: new RedState(context, this),
            yellow: new YellowState(context, this),
            green: new GreenState(context, this)
        }
    }

    getState(state) {
        return this.state[state]
    }

    getDefaultState() {
        return this.state.red
    }
}

export default StatePool
