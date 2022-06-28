import 'bootstrap/dist/css/bootstrap.min.css'
import "react-toggle/style.css"
import { EboxEvent } from 'elabox-foundation'
import { setEventHandler } from './actions/constants'

export * from './components'
export * from './container'
export * from './data/packageInfo'

export const initialize = (eventHandler?: EboxEvent) => {
    if (!eventHandler)
        eventHandler = new EboxEvent(window.location.origin)
    setEventHandler(eventHandler)
}
