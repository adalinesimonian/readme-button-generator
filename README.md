# readme-button-generator

[![Build Status](https://travis-ci.org/vsimonian/readme-button-generator.svg?branch=master)](https://travis-ci.org/vsimonian/readme-button-generator)

Node module that generates a button for use in a readme.

## Getting started

> **Note:** You'll need Node.js 7.6 or later as this module uses `async`/`await` natively.

```
$ npm i --save readme-button-generator
```

## Usage

```javascript
// Synchronous
const generator = new require('readme-button-generator')()

// Asynchronous (only for default template)
const generator = await require('readme-button-generator').createAsync()

let svg = generator.generate({
  text: 'Join Slack',
  icon: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png'
})
```

Result:

![Join Slack](https://rawgit.com/vsimonian/readme-button-generator/master/sample-button.svg)

You can then take the output and send it to [svgo](https://github.com/svg/svgo), [svg2png](https://github.com/domenic/svg2png), output it to a file, as an HTTP response - whatever you want!

## Default template options

- `text` - Text to display
- `icon` - Optional. URL to icon to display. Can be a data URL.
- `width` - Width in pixels. Defaults to 96.

## Custom templates

Don't like the default template? You can pass in a custom template:

```javascript
const fs = require('fs-extra')
const template = await fs.readFile('my-template.svg', 'utf8')
const generator = new require('readme-button-generator')(template)
```

Behind the scenes, the module uses [Handlebars](http://handlebarsjs.com/) and [handlebars-helpers' math helpers](https://github.com/helpers/handlebars-helpers#math), so you can accept whatever options you would like instead of the default template's `text`, `icon`, and `width`.

Feel free to [take a look at the default template](https://github.com/vsimonian/readme-button-generator/blob/master/button-template.svg) for inspiration!

## Licence

MIT
