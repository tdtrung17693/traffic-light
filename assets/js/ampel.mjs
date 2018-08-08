import StatePool from './statePool.mjs'
import Counter from './counter.mjs'
import ConfigManager from './configManager.mjs'

class Ampel {
    constructor(presenter, counter) {
        this.setPresenter(presenter)
        this.setCounter(counter)
        this.initDefaultState(presenter)
    }

    initDefaultState() {
        this.statePool = new StatePool(this)
        this.isOn = false
        this.mode = Ampel.AUTOMATIC_MODE
        this.timer = -1
    }

    setPresenter(presenter) {
        this.presenter = presenter
    }

    setCounter(counter) {
        this.counter = counter
    }

    setManualMode() {
        this.mode = Ampel.MANUAL_MODE
    }

    setAutomaticMode() {
        this.mode = Ampel.AUTOMATIC_MODE
    }

    nextState() {
        this.clearTimer()
        this.state.nextState()
    }

    turnOn() {
        if (this.isOn) return

        this.isOn = true
        this.setDefaultState()
    }

    setDefaultState() {
        this.setState(this.statePool.getDefaultState())
    }

    turnOff() {
        this.isOn = false

        this.presenter.renderOffState()
    }

    setState(state) {
        this.state = state

        this.light()

        this.counter.setValue(state.getTimeout())

        this.counter.run(() => {
            this.counter.stop()
            this.nextState()
        })

    }

    light() {
        this.presenter.render(this.state)
    }

    reset() {
        this.clearTimer()
        this.setDefaultState()
    }

    clearTimer() {
        this.counter.stop()
        this.timer = -1
    }
}

Ampel.MANUAL_MODE = 'manual'
Ampel.AUTOMATIC_MODE = 'automatic'

export default Ampel
