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
})
