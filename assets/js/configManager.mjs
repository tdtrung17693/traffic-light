const ConfigManager = {
    state: {
        timeout: {
            red: 10,
            yellow: 2,
            green: 10
        }
    },
    counter: {
        tick: {
            timeout: 1000
        }
    },
    // name format: 'a.b.c'. Example: 'state.timeout.red'
    getConfig(name, defaultValue=null) {
        let levels = name.split('.')
        let level = levels.shift()
        let parent = this[level]

        while (levels.length >= 1) {
            if (parent === undefined) {
                return defaultValue
            }

            level = levels.shift()
            parent = parent[level]
        }

        return parent ? parent : defaultValue
    }
}

export default ConfigManager
