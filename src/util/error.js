/**-----------------------------------------------------------------/
 *
 * Part of the kerma project
 * 
 *------------------------------------------------------------------/
 * 
 * @file util/cl.js
 * @author gkarlos 
 * @module util/cl
 * @description 
 *  Defines error types for the app. Different components may
 *  extend those classes
 *  
 *-----------------------------------------------------------------*/

 const color = require('cli-color')

/** Base class for command line related errors */
class CLError extends Error { 
  constructor(msg) { 
    super(msg)
    this.name = color.bold('cl');
  } 
}

/** Error indicating a file wasn't found */
class FileNotFoundError extends CLError {
  /**
   * @constructor
   * @class FileNotFoundError
   * @param {*} filename - the name of the file
   */
  constructor(filename) { 
    super(`Could not find file '${filename}'`) 
  }
}

/** Indicates internal errors */
class InternalError extends Error {
  constructor(msg) { 
    super(msg)
    this.name = color.bold('internal')
  } 
}

module.exports = {
  CLError, 
  FileNotFoundError,
  InternalError
}