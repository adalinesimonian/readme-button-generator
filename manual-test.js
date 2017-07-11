async function test () {
  const generator = await require('./index').createAsync()

  require('fs').writeFileSync('test.svg', await generator.generate({
    text: 'Join Slack',
    images: {
      icon: {
        url: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png'
      }
    }
  }))
}

test().catch(err => console.error(err))
