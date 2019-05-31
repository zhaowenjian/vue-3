import Vue from '@/main'

describe('DEMO', () => {
  afterEach(() => {
    document.body.appendChild(document.createElement('br'))
    document.body.appendChild(document.createElement('br'))
    document.body.appendChild(document.createElement('br'))
  })

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

  it('Mvvm in depth', function() {
    const title = document.createElement('h2')
    title.textContent = 'Mvvm In Depth'
    document.body.append(title)

    const vm = new Vue({
      data () {
        return {
          a: [{}],
        }
      },
      render (h) {
        return h('div', {}, this.a.map((item,i) => {
          return h('div', {}, [         
            h('button', { 
              on: { 'click': _ => this.setNumber(item) }
            }, 'Set Number'),
            h('button', { 
              on: { 'click': _ => this.deleteNumber(item) }
            }, 'Delete Number'),
            h('span', {}, item.number),
            h('button', { 
              on: { 'click': this.appendRow }
            }, 'Append Row'),
            h('button', { 
              on: { 'click': _ => this.removeRow(i) }
            }, 'Remove Row'),
            h('br', {}, '')])
          }
        ))
      },
      methods: {
        setNumber (item) {
          item.number = Math.random().toFixed(4)*100
        },
        deleteNumber (item) {
          delete item.number
        },
        appendRow () {
          this.a.push({})
        },
        removeRow (idx) {
          this.a.splice(idx, 1)
        }
      }
    }).$mount()

    document.body.append(vm.$el)
  });
})
