import Vue from '@/main'

describe('Base Next Tick', () => {
  it('next tick ', done => {
    const cb1 = jasmine.createSpy('cp1')
    const cb2 = jasmine.createSpy('cp2')

    const vm = new Vue()

    vm.$nextTick(() => {
      cb2()
      expect(cb1).toHaveBeenCalledBefore(cb2)
      expect(cb2).toHaveBeenCalledTimes(1)

      done()
    })

    cb1()
  })
})
