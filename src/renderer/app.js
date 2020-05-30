const ConsoleLogger       = require('./services/log').ConsoleLogger
const EventEmitter        = require('events')
const NotificationService = require('./services/notification/NotificationService')
const UI                  = require('./ui')
const Events              = require('./events')

class App {

  // Services
  Logger = new ConsoleLogger({level: ConsoleLogger.Level.Info, color: true})
  Notifier = new NotificationService()

  constructor() {
    this.electron = {}
    this.electron.remote = require('electron').remote
    this.electron.app = require('electron').remote.app

    this.events = Events

    this.input    = {
      path : null,
      contents : null
    }

    this.mock     = require(`../mock/cuda-source`)
    this.emitter  = new EventEmitter()
    this.ui       = undefined
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

  enableNotifications() { this.Notifier.enable; }
  disableNotifications() { this.Notifier.disable; }

  reload() { this.window.reload() }

  initPreUiServices() {
    this.Logger.enable()
  }

  initUI() {
    this.ui = UI.init(this);
  }

  initPostUiServices() {
    this.Notifier.enable()
  }

  start() {
    this.initPreUiServices()
    this.Logger.info("Hello")
    this.initUI();

    this.on(Events.UI_READY, () => {

      this.initPostUiServices();
    })


  } 
}

module.exports = App