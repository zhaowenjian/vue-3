import Vue from '@/main'

describe('Vue proxy', function () {
  it('proxy should vm.a = vm._data.a ', function () {
    const vm = new Vue({
      data () {
        return {
          a: 2
        }
      }
    })
    expect(vm.a).toEqual(2)
  })
})
