import fs from 'node:fs'
import Generator from './index.js'

async function test () {
  const generator = await Generator.createAsync()

  fs.writeFileSync('test.svg', await generator.generate({
    text: 'Join Slack',
    images: {
      icon: {
        url: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png'
      }
    }
  }))
}

test().catch(error => console.error(error))
