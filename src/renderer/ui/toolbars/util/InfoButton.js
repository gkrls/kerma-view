const Component = require('../../component/Component')
const Events = require('../../../events')
const openAboutWindow = require('electron-about-window').default
const path = require('path')
const {InternalError} = require('../../../../util/error')

class InfoButton extends Component {
  constructor(id, container, app) {
    super()
    this.id = id
    this.container = container
    this.app = app
    this.node = null
    this.name = `InfoButton[${this.id}]`
    this.rendered = false
    this.tooltip = "About"
  }

  render() {
    this.node = $(`
      <div id='${this.id}' data-toggle='tooltip' title='${this.tooltip}'>
        <h4><i class="fas fa-info-circle"></i></h4>
      </div>
    `).appendTo(this.container)
      .css("cursor", "pointer")
      .css("opacity", "0.6")
      .hover( function() { $( this ).fadeTo( 'fast', '1'); }, 
              function() { $( this ).fadeTo( 'fast', '.6'); })
      .tooltip()
      // .css("float", "right")

    this.rendered = true
    // this.app.emit(Events.UI_COMPONENT_READY, this)
    return this
  }

  useDefaultControls() {
    if ( !this.rendered)
      throw new InternalError("Component must be rendered before calling useDefaultControls()")

    this.node.on('click', () => {
      openAboutWindow({
        product_name: "KermaView",
        icon_path: this.app.iconPath,
        package_json_dir: this.app.root
      })
    })
  }
}

// function defaultCreate(app) {
//   if ( !app)
//     throw new InternalError('InfoButton.defaultCreate requires an app reference and none was passed')

//   let infoButton = new InfoButton("info-button", "#top-toolbar-right", app).render()

//   app.ui.on(Events.UI_READY, () => {

//   })
// }

module.exports = InfoButton