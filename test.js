import test from 'ava'
import Generator from './index'

test('should generate with defaults without errors', async t => {
  t.truthy(await new Generator().generate())
})

test('should generate with defaults without errors (async)', async t => {
  const generator = await Generator.createAsync()
  t.truthy(await generator.generate())
})

test('should allow custom templates', async t => {
  const generator = new Generator('<svg><text>{{text}}</text></svg>')
  t.is(
    await generator.generate({text: 'Hello, world'}),
    '<svg><text>Hello, world</text></svg>'
  )
})

test('should resize images', async t => {
  const template = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><image xlink:href="{{img}}" /></svg>'
  const expected = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAGUlEQVQokWNhWPSCgRTARJLqUQ2jGoaUBgDwIAGtAdM5tAAAAABJRU5ErkJggg&#x3D;&#x3D;" /></svg>'
  const generator = new Generator(template)
  t.is(
    await generator.generate({
      images: {
        img: {
          src: 'test-icon.png',
          width: 16,
          height: 16
        }
      }
    }),
    expected
  )
})
