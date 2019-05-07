import Vue from '@/main'

describe('vnode render', () => {
  it('Raw vnode render', () => {
    const vm = new Vue({
      data () {
        return {
          text: 'test text'
        }
      },

      render (h) {
        return h('div', {class: 'test'}, this.text)
      }
    }).$mount()

    
    expect(vm.$el.tagName).toBe('DIV')
    expect(vm.$el.textContent).toBe('test text')
    expect(vm.$el.className).toBe('test')
  })
})
