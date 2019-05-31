import Vue from '@/main'

describe('vnode render', () => {
  const cb = jasmine.createSpy('cb')

  it('Listeners test : ', () => {
    const vm = new Vue({
      data () {
        return {
          text: 'test text'
        }
      },

      render (h) {
        return h('button', {
          className: 'btn',
          on: {
            click: cb
          }
        }, this.text)
      }
    }).$mount()

    document.body.appendChild(vm.$el)
    const el = document.querySelector('.btn')
    expect(el.tagName).toEqual('BUTTON')
    el.click()
    expect(cb).toHaveBeenCalled()
    document.body.removeChild(vm.$el)
  })
})
