import Vue from '@/main'

describe('Couputed support', () => {
  it('computed basic', () => {
    const vm = new Vue({
      data () {
        return {
          a: 1
        }
      },
      computed: {
        b () {
          return this.a * 2
        }
      },
      render (h) {
        return h('div', {}, this.b)
      }
    }).$mount()

    expect(vm.b).toEqual(2)

    expect(vm.$el.textContent).toEqual('2')

    vm.a = 10

    expect(vm.b).toEqual(20)

    expect(vm.$el.textContent).toEqual('20')
  })

  it('chain', () => {
    const vm = new Vue({
      data () {
        return {
          a: 1
        }
      },
      computed: {
        b () {
          return this.a + 1
        },
        c () {
          return this.b + 2
        }
      },
      render (h) {
        return h('div', {}, this.c)
      }
    }).$mount()

    expect(vm.c).toEqual(4)

    expect(vm.$el.textContent).toEqual('4')

    vm.a = 10

    expect(vm.c).toEqual(13)

    expect(vm.$el.textContent).toEqual('13')
  })
})
