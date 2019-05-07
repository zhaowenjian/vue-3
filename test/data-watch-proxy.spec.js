import Vue from '@/main'

describe('Vue proxy', function () {
  it('cb is called', function () {
    const vm = new Vue({
      data () {
        return {
          a: 2
        }
      }
    })
    vm.$watch('a', (pre, val) => {
      expect(pre).toEqual(2)
      expect(val).toEqual(3)
    })
    vm.a = 3
  })
})
