import test from 'ava'
import Generator from './index'

test('should generate with defaults without errors', t => {
  t.truthy(new Generator().generate())
})

test('should generate with defaults without errors (async)', async t => {
  const generator = await Generator.createAsync()
  t.truthy(generator.generate())
})

test('should allow custom templates', t => {
  const generator = new Generator('<svg><text>{{text}}</text></svg>')
  t.is(
    generator.generate({text: 'Hello, world'}),
    '<svg><text>Hello, world</text></svg>'
  )
})
