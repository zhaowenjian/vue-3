import HelloWorld from '@/HelloWorld.jsx'
import {createElement} from 'react'
import {render} from 'react-dom'

describe('React HelloWorld', () => {
  it('react render', () => {
    const root = document.createElement('div')
    document.body.appendChild(root)

    render(createElement(HelloWorld, {name: 'juanjuan'}), root)

    const link = document.querySelector('.testALink')

    expect(link.textContent).toBe('juanjuan')
  })
})