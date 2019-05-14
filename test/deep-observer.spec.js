import Vue from "../src/main"

describe('Deep Object observer', () => {
  it('deep-obj-observer', () => {
    const vm = new Vue({
      data () {
        return {
          a: {
            b: 5
          }
        }
      },
      render (h) {
        return h('div', {
          class: 'test'
        }, this.a.b)
      }
    }).$mount()

    document.body.appendChild(vm.$el)

    expect(vm.a.b).toBe(5)
    
    vm.a.b++

    expect(vm.a.b).toBe(6)

    vm.a.b = 10

    expect(vm.a.b).toBe(10)
  })
})