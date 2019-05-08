import Vue from '@/main'

describe('DEMO', () => {
  it('Basic', () => {
    const vm = new Vue({
      data () {
        return {
          text: 'test text'
        }
      },

      methods: {
        clickHandle () {
          this.text = 'clicked'
        }
      },

      render (h) {
        return h('div', {class: 'test', listeners: {'click': this.clickHandle}}, this.text)
      }
    }).$mount()

    document.body.append(vm.$el)
  })
})
