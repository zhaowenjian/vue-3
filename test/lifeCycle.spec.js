import Vue from '@/main'

describe('vnode render', () => {
  const cb = jasmine.createSpy('cb')

  it('Raw vnode render', () => {
    const vm = new Vue({
      data () {
        return {
          text: 'test text'
        }
      },

      mounted () {
        cb()
      },

      render (h) {
        return h('div', {class: 'test'}, this.text)
      }
    }).$mount()

    expect(cb).toHaveBeenCalled()
  })
})
