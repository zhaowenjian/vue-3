import Vue from '@/main'

describe('Schedule Use', () => {
  it('watcher run once ', (done) => {
    const cb = jasmine.createSpy('cb')
    const vm = new Vue({
      data () {
        return {
          a: 1,
          b: 2
        }
      },
      computed: {
        c () {
          return this.a + this.b
        }
      },
      watch: {
        c () {
          cb()
        }
      },
      render (h) {
        return h('div', null, this.c)
      }
    }).$mount()

    vm.a = 3
    vm.b = 4

    setTimeout(() => {
      expect(cb).toHaveBeenCalledTimes(1)
      done()
    })
  })
  
  it('render once ', (done) => {
    const cb = jasmine.createSpy('cb')
    const vm = new Vue({
      data () {
        return {
          a: 1,
          b: 2
        }
      },
      computed: {
        c () {
          return this.a + this.b
        }
      },
      render (h) {
        cb()
        return h('div', null, this.c)
      }
    }).$mount()
    
    expect(cb).toHaveBeenCalledTimes(1)

    vm.a = 3
    vm.b = 4

    setTimeout(() => {
      expect(cb).toHaveBeenCalledTimes(2)
      done()
    })
  })
})
