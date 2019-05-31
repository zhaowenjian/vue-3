import Vue from '@/main'

describe('Mvvm components use', () => {
  it('render vode with component', () => {
    const vm = new Vue({
      data () {
        return {
          label: 'hello',
          info: 'world'
        }
      },
      components: {
        'my-component': {
          data () {
            return {}
          },
          props: ['msg'],
          render (h) {
            return h('p', null, this.msg)
          }
        }
      },
      render (h) {
        return h('div', null, [
          h('my-component', {props: {msg: this.label}}),
          h('my-component', {props: {msg: this.info}})
        ])
      }
    }).$mount()

    expect(vm.$el.outerHTML).toEqual(`<div><p>hello</p><p>world</p></div>`)
  })

  it('mvvm component', () => {
    const vm = new Vue({
      data () {
        return {
          msg: 'hello'
        }
      },
      components: {
        'my-component': {
          props: ['msg'],
          render (h) {
            return h('p', null, this.msg)
          }
        }
      },
      render (h) {
        return h('my-component', {props: {msg: this.msg}})
      }
    }).$mount()

    expect(vm.$el.outerHTML).toEqual(`<p>hello</p>`)

    vm.msg = 'world'

    expect(vm.$el.outerHTML).toEqual(`<p>world</p>`)
  })
  
  it('event & action', () => {
    const cb = jasmine.createSpy('cb')

    const vm = new Vue({
      data () {
        return {
        }
      },
      components: {
        'my-component': {
          render (h) {
            return h('div', {}, 'my-component')
          },
          mounted () {
            this.$emit('coustom-event', {mounted: 'mounted'})
          }
        }
      },
      render (h) {
        return h('my-component', {
          on: {
            'coustom-event': cb
          }
        })
      }
    }).$mount()

    expect(cb).withContext(vm)

    expect(cb).toHaveBeenCalledWith({mounted: 'mounted'})
  })
})
