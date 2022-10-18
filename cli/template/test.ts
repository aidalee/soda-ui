import { upperFirst } from './utils'

export default function genTestTemplate(name) {
  return `\
import { mount } from '@vue/test-utils'
import ${upperFirst(name)} from '../src/${name}'

describe('${name} test', () => {
  test('${name} init render', async () => {
    const { getByRole } = render(${upperFirst(name)})
    getByRole('${name}')
  })
})
`
}
