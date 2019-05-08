import Vue from '@/main'

describe('MVVM', () => {
  it('mvvm use', () => {
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

    document.body.appendChild(vm.$el)

    expect(vm.$el.textContent).toBe('test text')

    vm.text = 'hello'
    
    expect(vm.$el.textContent).toBe('hello')
  })
})
