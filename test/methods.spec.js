import Vue from '@/main'

describe('methods call', () => {
  it('methods called', () => {
    const vm = new Vue({
      data () {
        return {
          a: 11
        }
      },
      methods: {
        hello () {
          return {
            self: this,
            a: 11
          }
        }
      }
    })
    const ret = vm.hello()

    expect(ret.self).toEqual(vm)
    expect(ret.a).toBe(11)
  })
})
