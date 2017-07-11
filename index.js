const path = require('path')
const fs = require('fs-extra')
const Handlebars = require('handlebars')
require('handlebars-helpers').math({
  handlebars: Handlebars
})

/**
 * Class which generates buttons.
 */
class Generator {
  /**
   * Creates a new button generator.
   * @param {string} template Optional. The template to use. Defaults to the
   * default, built-in template.
   */
  constructor (template) {
    if (!template) {
      template = fs.readFileSync(
        path.join(__dirname, 'button-template.svg'), 'utf8'
      )
    }
    this._template = Handlebars.compile(template)
  }

  /**
   * Creates a new button generator with the default template.
   */
  static async createAsync () {
    return new Generator(await fs.readFile(
      path.join(__dirname, 'button-template.svg'), 'utf8'
    ))
  }

  /**
   * Generates a button with the given options.
   * @param {object} options The options to be passed to the template.
   */
  generate (options) {
    return this._template(options)
  }
}

module.exports = Generator
