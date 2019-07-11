import Vue from '@/main'

describe('MVVM', () => {
  it('mvvm use', (done) => {
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
    
    setTimeout(() => {
      expect(vm.$el.textContent).toBe('hello')
      done()
      document.body.removeChild(vm.$el)
    })
  })

  it('Add/Delete property', () => {
    const vm = new Vue({
      data () {
        return {
          a: {}
        }
      },
      render (h) {
        return h('div', null, this.a.b)
      }
    }).$mount()

    expect(vm.$el.textContent).toBe('')

    vm.a.b = 0

    expect(vm.a.b).toBe(0)

    setTimeout(() => {
      expect(vm.$el.textContent).toBe('0')

      vm.a.b = 10
      setTimeout(() => {
        expect(vm.$el.textContent).toBe('10')

        delete vm.a.b

        expect(vm.a.b).toBe(undefined)

        setTimeout(() => {
          expect(vm.$el.textContent).toBe('')
        })
      })
      
    })

  })
  
  it('Array setter/getter', (done) => {
    const vm = new Vue({
      data () {
        return {
          a: ['hello']
        }
      },
      render (h) {
        return h('div', null, this.a[0])
      }
    }).$mount()

    expect(vm.a[0]).toBe('hello')
    
    setTimeout(() => {
      expect(vm.$el.textContent).toBe('hello')

      vm.a[0] = 'world'

      setTimeout(() => {
        expect(vm.$el.textContent).toBe('world')
        done()
      })
    })

  })

  it('Array push/slice', () => {
    const vm = new Vue({
      data () {
        return {
          a: [1]
        }
      },
      render (h) {

        return h('div', null, this.a[this.a.length -1])
      }
    }).$mount()

    expect(vm.$el.textContent).toBe('1')

    vm.a.push(2)

    setTimeout(() => {
      expect(vm.$el.textContent).toBe('2')

      vm.a.splice(2, 0, '!!')
      setTimeout(() => {
        expect(vm.$el.textContent).toBe('!!')
      })
    })

  })

  it('Change array item property', () => {
    const vm = new Vue({
      data () {
        return {
          a: [{msg: 'hello'}]
        }
      },
      render (h) {
        return h('div', null, this.a[0].msg)
      }
    }).$mount()

    vm.a[0].msg = 'world'

    setTimeout(() => {
      expect(vm.$el.textContent).toBe('world')
    })
  })
})
