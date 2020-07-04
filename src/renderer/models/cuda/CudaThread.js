const CudaIndex = require('@renderer/models/cuda/CudaIndex')
const CudaWarp = require('@renderer/models/cuda/CudaWarp')
const CudaLimits = require('@renderer/models/cuda/CudaLimits')

/** @ignore @typedef {import("@renderer/models/cuda/CudaBlock")} CudaBlock */
/** @ignore @typedef {import("@renderer/models/cuda/CudaWarp")} CudaWarp */
/** @ignore @typedef {import("@renderer/models/cuda/CudaIndex")} CudaIndex */

/**
 * Represents a Cuda thread.  This class is meant to be used to 
 * describe specific threads in a block.
 * 
 * @memberof module:cuda
 */
class CudaThread {
  /** @type {CudaBlock} */
  #block
  /** @type {CudaIndex} */
  #index
  /** @type {CudaIndex} */
  #globalIndex
  /** @type {CudaWarp} */
  #warp
  
  /**
   * Create a new CudaThread instance
   * @param {CudaBlock} block 
   * @param {CudaIndex|Number} index 
   */
  constructor(block, index) {
    if ( index instanceof CudaIndex) {
      if ( index.x >= block.x)
        throw new Error(`Invalid thread index '${index.toString()}' for block '${block.toString()}'`)
      if ( index.is2D() && index.y >= block.y)
        throw new Error(`Invalid thread index '${index.toString()}' for block '${block.toString()}'`)
      this.#index = index
    } else if ( Number.isInteger(index)) {
      if ( index >= block.size())
        throw new Error(`Invalid thread index '${index}' for block '${block.toString()}'`)
      this.#index = index
    } else {
      throw new Error(`Invalid argument 'index'. Must be an Integer or CudaIndex instance`)
    }

    // TODO #globalIndex = ?
    this.#block = block
    this.#warp = undefined
  }

  /** @type {CudaIndex} */
  get index() { return this.#index }

  /** @type {Number} */
  get x() { return this.#index.x }

  /** @type {Number} */
  get y() { return this.#index.y }

  /** @type {CudaIndex} */
  get globalIndex() { return this.#globalIndex }

  /** @type {Number} */
  get globalX() { return this.#globalIndex.x }

  /** @type {Number} */
  get globalY() { return this.#globalIndex.y }

  /**
   * Retrieve the block this thread is part of
   * @returns {CudaBlock}
   */
  getBlock() { return this.#block }

  /**
   * Retrieve the warp (within its block) this thread belongs to
   * @returns {CudaWarp}
   */
  getWarp() { 
    if ( this.#warp === undefined)
      this.#warp = new CudaWarp( this.#block, CudaIndex.linearize(this.#index, this.#block.dim) / CudaLimits.warpSize)
    return this.#warp
  }

  inUnusedLane() {
    return this.getWarp().getLastUsableThread() >= CudaIndex.linearize(this.index, this.getBlock().dim)
  }

  /**
   * Compare with another thread for equality
   * Two threads are considered equal if they belong to the same block and have the same index
   * within the block
   * @param {*} other 
   */
  equals(other) {

  }
}

module.exports = CudaThread