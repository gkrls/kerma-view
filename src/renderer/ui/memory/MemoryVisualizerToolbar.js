/**--renderer/components/memory/MemoryVisualizer.js------------------/
 *
 * Part of the kerma project
 * 
 *------------------------------------------------------------------/
 * 
 * @file renderer/components/memory/MemoryVisualizer.js
 *  
 *//*--------------------------------------------------------------*/
'use-strict'

const Component = require('../component/Component')

/**
 * @memberof module:ui/memory
 */
class MemoryVisualizerToolbar extends Component {
  constructor(id, container, vizualizer) {
    super(`MemoryVisualizerToolbar[${id}]`)
    this.id = id;
    this.container_ = container
    this.visualizer_ = vizualizer
  }

  get visualizer() { return this.visualizer_ }
  get container() { return this.container_ }

  render() {
    this.node = $(`
      <div id='${this.id}'>
        Visualizer toolbar for: ${this.visualizer.memory.getName()}
      </div>
    `).appendTo(this.container)
  }
}

module.exports = MemoryVisualizerToolbar