import Vue from '@/main'

describe('Watch support', () => {
  it('watch use', () => {
    const dataCb = jasmine.createSpy('dataCb')
    const comCb = jasmine.createSpy('comCb')

    const vm = new Vue({
      data () {
        return {
          a: 1
        }
      },

      computed: {
        e () {
          return 2 * this.a
        }
      },

      watch: {
        e (newVal, oldVal) {
          comCb(newVal, oldVal)
        }
      },

      render (h) {
        return h('p', null, this.a)
      }
    }).$mount()

    vm.a = 2

    setTimeout(() => {
      expect(comCb).toHaveBeenCalledWith(2, 4)
    })
  })
})
