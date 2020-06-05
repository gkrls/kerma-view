/**
 * @module app
 */
const ConsoleLogger       = require('./services/log').ConsoleLogger
const EventEmitter        = require('events')
const NotificationService = require('./services/notification/NotificationService')
const UI                  = require('./ui')
const Events              = require('./events')


const services = {}



/**
 * Main class of the application
 * @memberof module:app
 */
class App {

  // Services pre-ui
  Logger = new ConsoleLogger({level: ConsoleLogger.Level.Info, color: true})
  // Services post-ui

  /** @type {NotificationService} */
  Notifier = null

  constructor() {
    this.electron = {}
    this.electron.remote = require('electron').remote
    this.electron.app = require('electron').remote.app

    this.events = Events
    this.Events = Events

    this.input    = {
      path : null,
      contents : null
    }

    this.mock     = require(`../mock/cuda-source`)
    this.emitter  = new EventEmitter()
    this.ui       = undefined

    /// notifications
    this.initNotification = null
  }

  get root()    { return this.electron.app.root;     }
  get icon()    { return this.electron.app.iconPath; }
  get version() { return this.electron.app.version;  }
  get window()  { return this.electron.remote.getCurrentWindow() }

  get on()      { return this.emitter.on   }
  get emit()    { return this.emitter.emit }
  get once()    { return this.emitter.once }
  get eventNames()         { return this.emitter.eventNames }
  get removeAllListeners() { return this.emitter.removeAllListeners }
  get removeListener()     { return this.emitter.removeListener     } 

  enableLogging() { this.Logger.enable() }
  disableLogging() { this.Logger.disable() }

  enableNotifications() { this.Notifier && this.Notifier.enable; }
  disableNotifications() { this.Notifier && this.Notifier.disable; }

  reload() { this.window.reload() }
  
  initUI() {
    this.ui = UI.init(this);
  }

  /**
   * Initialize the services that do not depend on UI to be rendered
   */
  initPreUiServices() {
    this.Logger.enable()
  }

  /**
   * Initialize the services that require the UI to be rendered
   */
  initPostUiServices() {
    this.Notifier = new NotificationService(this).enable()
    // this.initNotification = this.Notifier.error("Initializing...", { progress: true, changeOnComplete: this.Notifier.NotificationType.Success})
                                        //  .onComplete( () => this.initNotification.updateMessage('App is ready'))
    
    // this.Notifier.notify("Initializing...", { progress: true, changeOnComplete: this.Notifier.NotificationType.Success})
    
    let notification2 = this.Notifier.warning("Initializing...", { progress: true, sticky: true})
    let notification3 = this.Notifier.error("Initializing...", { sticky: true})
    let notification4 = this.Notifier.notify("Initializing...")
    
    // // setTimeout(() => notification1.progress(50, "ui ready"), 250)
    setTimeout(() => notification2.progress(50, "ui ready"), 500)
    setTimeout(() => notification3.progress(50, "ui ready"), 750)
    setTimeout(() => notification4.progress(50, "ui ready"), 1000)


    // // // setTimeout(() => notification1.progress(49, "services ready"), 1250)
    setTimeout(() => notification2.progress(50, "services ready"), 1000)
    setTimeout(() => notification3.progress(50, "services ready"), 2250)
    setTimeout(() => notification4.progress(50, "services ready"), 3500)

  }

  start() {
    
  }

  main() {
    this.initPreUiServices()
    this.initUI();
    this.on(Events.UI_READY, () => {
      this.initPostUiServices();
      this.start()
    })
  } 
}

const instance = new App()

module.exports = instance