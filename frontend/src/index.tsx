import 'bootstrap/dist/css/bootstrap.min.css'
import { EboxEvent } from 'elabox-foundation'
import { setEventHandler } from './actions/constants'

export * from './components/AppDashboard'
export * from './container/AppInfoCon'
export * from './container/AppIconCon'
export * from './data/packageInfo'

export const initialize = (eventHandler?: EboxEvent) => {
    if (!eventHandler)
        eventHandler = new EboxEvent(window.location.origin)
    setEventHandler(eventHandler)
}
