const path = require('path')
const fs = require('fs-extra')
const Handlebars = require('handlebars')
const sharp = require('sharp')
const request = require('request-promise-native').defaults({
  encoding: null
})
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
  async generate (options) {
    if (options && options.images) {
      await Promise.all(
        Object.getOwnPropertyNames(options.images).map(async prop => {
          let image
          if (options.images[prop].src) {
            image = sharp(await fs.readFile(options.images[prop].src))
          } else {
            image = sharp(await request(options.images[prop].url))
          }
          const metadata = await image.metadata()
          const width = options.images[prop].width || 32
          const height = options.images[prop].height || 32
          if (metadata.width > width || metadata.height > height) {
            image.resize(width, height)
          }
          const data = await image.toFormat('png').toBuffer()
          options[prop] = 'data:image/png;base64,' + data.toString('base64')
        })
      )
    }
    return this._template(options)
  }
}

module.exports = Generator
