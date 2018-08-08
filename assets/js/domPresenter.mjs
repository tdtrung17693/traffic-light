class DOMPresenter {
    constructor(container) {
        this.container = container
    }

    render(state) {
        requestAnimationFrame(() => {
            this.container.innerHTML = state.getStateView(this)
        })
    }

    renderOffState() {
        requestAnimationFrame(() => {
            this.container.innerHTML = this.getAmpelOffView();
        })
    }

    getAmpelView(viewState) {
        let domString = "";

        domString += `<div class="ampel-light is-state-${viewState}">`
        domString += '<div class="red-light"></div>'
        domString += '<div class="yellow-light"></div>'
        domString += '<div class="green-light"></div>'
        domString += '</div>'

        return domString;
    }

    getAmpelOffView() {
        let domString = "";

        domString += '<div class="ampel">'
        domString += '<div class="red-light"></div>'
        domString += '<div class="yellow-light"></div>'
        domString += '<div class="green-light"></div>'
        domString += '</div>'

        return domString;
    }

    getRedActiveView() {
        return this.getAmpelView(DOMPresenter.RED)
    }

    getYellowActiveView() {
        return this.getAmpelView(DOMPresenter.YELLOW)
    }

    getGreenActiveView() {
        return this.getAmpelView(DOMPresenter.GREEN)
    }
}

DOMPresenter.RED = 'red'
DOMPresenter.YELLOW = 'yellow'
DOMPresenter.GREEN = 'green'

export default DOMPresenter
