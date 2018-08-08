import ConfigManager from './configManager.mjs'

class Counter {
    constructor(initialValue = 0, tickCallback = () => {}) {
        this.timer = -1
        this.tickCallback = tickCallback
        this.setValue(initialValue)
        this.c = 1
    }

    decrease() {
        this.count -= 1
    }

    setTickCallback(cb) {
        this.tickCallback = cb
    }

    setValue(value) {
        this.count = value
    }

    run(cb) {
        const a = this.c
        const infiniteRun = () => {
            this.tickCallback(this.count)
            this.decrease()

            if (this.count < 0) {
                cb()
                return
            }

            this.timer = setTimeout(infiniteRun, ConfigManager.getConfig('counter.tick.timeout'))
        }

        infiniteRun()
        this.c += 1
    }

    stop() {
        clearTimeout(this.timer)
        this.timer = -1
    }
}

export default Counter
