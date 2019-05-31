
import Vue from '@/main'

describe('Props Demo', () => {
  it('Basic', () => {
    const vm = new Vue({
      props: ['msg'],
      propsData: {
        msg: 'hello'
      },
      render (h) {
        return h('div', {}, this.msg)
      }
    }).$mount()

    expect(vm.$el.textContent).toBe('hello')
  })
})
