const path = require('path')
require('app-module-path').addPath(path.join(__dirname, "..", "..", "..", "src"))

const expect = require('chai').expect

const NotificationModel = require('renderer/services/notification/NotificationModel')

describe("NotificationModel", () => {
  describe("constructor", () => {
    it('should work with no options', () => {
      let notification = new NotificationModel()
      expect(notification.title).to.equal("")
      expect(notification.message).to.equal("")
      expect(notification.details).to.equal("")
      expect(notification.type).to.equal(NotificationModel.Info)
    })

    it('should work with missing options', () => {
      let notification = new NotificationModel({
        title : "title",
        type : NotificationModel.Error
      })
      expect(notification.title).to.equal("title")
      expect(notification.type).to.equal(NotificationModel.Error)
      expect(notification.message).to.equal("")
      expect(notification.details).to.equal("")
    })

    it('should work with full options', () => {
      let notification = new NotificationModel({
        title : "title",
        type : NotificationModel.Warning,
        message: "message",
        details: "some details"
      })
      expect(notification.title).to.equal("title")
      expect(notification.type).to.equal(NotificationModel.Warning)
      expect(notification.message).to.equal("message")
      expect(notification.details).to.equal("some details")
    })
  })

  describe("getters", () => {
    it('should work', () => {
      let notification = new NotificationModel({
        title : "title",
        type : NotificationModel.Warning,
        message: "message",
        details: "some details"
      })
      expect(notification.getTitle()).to.equal("title")
      expect(notification.getType()).to.equal(NotificationModel.Warning)
      expect(notification.getMessage()).to.equal("message")
      expect(notification.getDetails()).to.equal("some details")
    })
  })

  describe("setters", () => {
    it('should work', () => {
      let notification = new NotificationModel({
        title : "title",
        type : NotificationModel.Warning,
        message: "message",
        details: "some details"
      })
      expect(notification.getTitle()).to.equal("title")
      expect(notification.getType()).to.equal(NotificationModel.Warning)
      expect(notification.getMessage()).to.equal("message")
      expect(notification.getDetails()).to.equal("some details")

      expect(notification.setTitle('abc').getTitle()).to.equal('abc')
      expect(notification.setType(NotificationModel.Error).getType()).to.equal(NotificationModel.Error)
      expect(notification.setMessage('def').getMessage()).to.equal('def')
      expect(notification.setDetails('ghi').getDetails()).to.equal('ghi')
    })
  })
})