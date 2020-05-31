'use strict';

const NotificationModel = require('@renderer/services/notification/NotificationModel')

var BootstrapNotify = require('bootstrap-notify')

/**
 * This callback is part of the {@link module:notification.NotificationView} class.
 * Fired when the notification is shown
 * @callback NotificationOnShowCallback
 * @param {NotificationModel} model The notification model instance
 * @memberof module:notification
 * @returns void
 */

/**
 * This callback is part of the {@link module:notification.NotificationView} class.
 * Fired when the notification is manually closed
 * @callback NotificationOnHideCallback
 * @param {NotificationModel} model The notification model instance
 * @memberof module:notification
 * @returns void
 */

/**
 * This callback is part of the {@link module:notification.NotificationView} class.
 * Fired when the notification data is changed
 * @callback NotificationOnChangeCallback
 * @param {NotificationModel} model The notification model instance
 * @memberof module:notification
 * @returns void
 */

/**
 * This class renders a notification to the DOM
 * 
 * To avoid undecessary complexity (as the use cases are minimal for now)
 * this class acts both as a view and a handler for notifications. That is,
 * the {@link module:notification~NotificationService} operates (and returns)
 * these object.
 * 
 * In the future we may explicitely add a NotificationHandler if the use cases
 * get more complicated
 * 
 * @class
 * @memberof module:notification
 * @requires module:notification.NotificationModel
 * @requires module:notification.NotificationView
 * @requires bootstrap-notify<external>
 */
class NotificationView {

  /** 
   * @static
   * @protected
   */
  static Icon = {
    Info    : 'fa fa-info-circle',
    Error   : 'fa fa-info-circle',
    Success : 'fa fa-info-circle',
    Warning : 'fa fa-info-circle'
  }
  static Animation = { enter: 'animated fadeInDown', exit: 'animated fadeOutUp' }
  static Position  = { from: "bottom", align: "right" }
  static Duration  = 1500
  static Dismissable = true

  /**
   * @param {NotificationModel} model The model of this view
   */
  constructor(model) {
    /** @private */
    this.model = model
    this.viewimpl = undefined
    /** @type {Array.<NotificationOnShowCallback>}   */
    this.onShowCallbacks = []
    /** @type {Array.<NotificationOnHideCallback>}  */
    this.onHideCallbacks = []
    /** @type {Array.<NotificationOnChangeCallback>} */
    this.onChangeCallbacks = []
  }

  /**
   * Retrieve the notification model
   * @returns {NotificationModel}
   */
  getModel() { return this.model }

  /**
   * Update the title of the notification
   * 
   * @param {String} title 
   */
  udpateTitle(title) { 
    this.model.setTitle(title)
    if ( this.viewimpl)
      this.viewimpl.update('title', title)
    this.onChangeCallbacks.forEach(callback => callback(this.model))
    return this;
  }

  /**
   * Update the message of the notification
   * 
   * @param {String} message 
   */
  updateMessage(message) {
    this.model.setMessage(message)
    if ( this.viewimpl)
      this.viewimpl.update('message', message)
    this.onChangeCallbacks.forEach(callback => callback(this.model))
    return this;
  }

  /**
   * Update the details of the notification
   * 
   * @param {String} details 
   */
  updateDetails(details) {
    this.model.setDetails(details)
    //TODO update viewimpl details
    this.onChangeCallbacks.forEach(callback => callback(this.model))
    return this;
  }

  /** Show the notification */
  show() { 
    if ( this.viewimpl)
      delete this.viewimpl
    this.viewimpl = this._renderNotification()
    console.log(this.viewimpl)
    this.onShowCallbacks.forEach(callback => callback(this.model))
    return this;
  }

  /** Hide the notification */
  hide() { 
    this.viewimpl.close() 
    this.onHideCallbacks.forEach(callback => callback(this.model))
    return this;
  }

  /**
   * Register a callback to be invoked when the notification is displayed
   * That is, the callback will be called when {@link NotificationView#show} is called
   * 
   * @param {NotificationOnShowCallback} callback A callback
   * @returns {Boolean} Whether the callback was registered successfully
   */
  onShow(callback) { 
    if ( typeof callback === 'function') {
      this.onShowCallbacks.push(callback) 
      return true
    }
    return false
  }

  /**
   * Register a callback to be invoked when the notification gets (manually) closed
   * That is, the callback will be called when {@link NotificationView#show} is called
   * 
   * @param {NotificationOnHideCallback} callback A callback
   * @returns {Boolean} Whether the callback was registered successfully
   */
  onHide(callback) { 
    if ( typeof callback === 'function') {
      this.onHideCallbacks.push(callback) 
      return true
    }
    return false
  }

  /**
   * Register a callback to be fired when the notification data changes
   * e.g on {@link NotificationHandler#updateTitle}
   * @param {NotificationOnChangeCallback} callback A callback
   * @returns {Boolean} Whether the callback was registered successfully
   */
  onChange(callback) {
    if ( typeof callback === 'function') {
      this.onChangeCallbacks.push(callback) 
      return true
    }
    return false
  } 

  /** 
   * @protected 
   * @inner 
   */
  _renderNotification() {
    console.log("Switching")
    switch(this.model.type) {
      case NotificationModel.Error:
        return this._renderError()
      case NotificationModel.Info: 
        return this._renderInfo()
      case NotificationModel.Success:
        return this._renderSuccesss()
      case NotificationModel.Warning:
        return this._renderWarning()
      default:
        throw new Error(`Unknown type: '${this.model.type}'`)
    }
  }

  /**
   * @protected 
   * @inner
   */
  _renderError() {
    return $.notify(
      {
        icon: 'fa fa-info-circle',
        newest_on_top: true,
        allow_dismiss: true,
        title: `<strong>asdasdasd${this.model.getTitle()}</strong>`,
        message: this.model.getMessage()
      }
      ,
      {
        mouse_over: 'pause',
        delay: 2000,
        type: 'danger',
        animate: {
          enter: 'animated fadeInDown',
          exit: 'animated fadeOutUp'
        },
        placement : {
          from: "bottom",
          align: "right"
        }
      }
    )
  }

  /**
   * @protected 
   * @inner
   */
  _renderInfo() {
    console.log("RENDER INFO")
    console.log(this.model)
    console.log(this.model.getMessage())
    let x = $.notify(
      {
        icon: 'fa fa-info-circle',
        newest_on_top: true,
        allow_dismiss: true,
        title: `<strong>${this.model.getTitle()}</strong>`,
        message: this.model.getMessage()
      }
      ,
      {
        mouse_over: 'pause',
        delay: 2000,
        type: 'info',
        animate: {
          enter: 'animated fadeInDown',
          exit: 'animated fadeOutUp'
        },
        placement : {
          from: "bottom",
          align: "right"
        }
      }
    )
  }

  /**
   * @protected 
   * @inner
   */
  _renderSuccesss() {
    return $.notify(
      {
        icon: 'fa fa-info-circle',
        newest_on_top: true,
        allow_dismiss: true,
        title: `<strong>${this.model.getTitle()}</strong>`,
        message: this.model.getMessage()
      }
      ,
      {
        mouse_over: 'pause',
        delay: 2000,
        type: 'success',
        animate: {
          enter: 'animated fadeInDown',
          exit: 'animated fadeOutUp'
        },
        placement : {
          from: "bottom",
          align: "right"
        }
      }
    )
  }

  /**
   * @protected 
   * @inner
   */
  _renderWarning() {
    return $.notify(
      {
        icon: 'fa fa-info-circle',
        newest_on_top: true,
        allow_dismiss: true,
        title: `<strong>${this.model.getTitle()}</strong>`,
        message: this.model.getMessage()
      }
      ,
      {
        mouse_over: 'pause',
        delay: 2000,
        type: 'warning',
        animate: {
          enter: 'animated fadeInDown',
          exit: 'animated fadeOutUp'
        },
        placement : {
          from: "bottom",
          align: "right"
        }
      }
    )
  }
}

module.exports = NotificationView