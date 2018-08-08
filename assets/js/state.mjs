import ConfigManager from './configManager.mjs'

class State {
    constructor(context, statePool) {
        this.context = context
        this.statePool = statePool
        this.active = false
    }

    setActive(active) {
        this.active = active
    }

    getTimeout() {
        throw Error('getTimeout is not implemented yet')
    }
}

export class RedState extends State {
    nextState() {
        this.context.setState(this.statePool.getState('yellow'))
    }

    getStateView(presenter) {
        return presenter.getRedActiveView(this)
    }

    getTimeout() {
        return ConfigManager.getConfig('state.timeout.red')
    }
}

export class YellowState extends State {
    nextState() {
        this.context.setState(this.statePool.getState('green'))
    }

    getStateView(presenter) {
        return presenter.getYellowActiveView(this)
    }

    getTimeout() {
        return ConfigManager.getConfig('state.timeout.yellow')
    }
}

export class GreenState extends State {
    nextState() {
        this.context.setState(this.statePool.getState('red'))
    }

    getStateView(presenter) {
        return presenter.getGreenActiveView(this)
    }

    getTimeout() {
        return ConfigManager.getConfig('state.timeout.green')
    }
}
