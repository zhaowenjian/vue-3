import {createElement, createEl} from './render'

export default class Vue {
  constructor (options) {
    this.$options = options
    
    this.initWatch()

    this.proxy = this.initDataProxy()

    return this.proxy
  }

  update () {
    const parent = this.$el.parentElement

    const vnode = this.$options.render.call(this.proxy, createElement)
    const temp = this.$el
    this.$el = this.patch(null, vnode)

    if (parent) {
      parent.removeChild(temp)
      parent.appendChild(this.$el)
    }
  }

  patch (oldVnode, newVnode) {
    return createEl(newVnode, this)
  }

  $mount (root) {
    const {render, mounted} = this.$options

    const vnode = render.call(this.proxy, createElement)

    this.$el = createEl(vnode)

    if (root) {
      const parent = root.parentElement
      parent.removeChild(root)
      parent.appendChild(this.$el)
    }
    
    mounted && mounted.call(this.proxy)

    return this
  }

  initWatch () {
    this.watchChain = {}
  }
  
  $watch (key, cb) {
    this.watchChain[key] = this.watchChain[key] || []
    this.watchChain[key].push(cb)
  }

  notifyChange (key, pre, val) {
    (this.watchChain[key] || []).forEach(cb => cb(pre, val))
  }

  initDataProxy () {
    const data = this.$options.data ? this.$options.data() : {}
    const methods = this.$options.methods || {}
    return new Proxy(this, {
      get: (_, key, receiver) => {
        if (key in data) {
          this.$watch(key, this.update.bind(this))
          return data[key]
        }
        if (key in methods) return methods[key].bind(this.proxy)
        return this[key]
      },
      set: (_, key, val, receiver) => {
        const pre = data[key] || this[key]
        if (pre === val) return true
        if (key in data) {
          data[key] = val
          this.notifyChange(key, pre, val)
        } else {
          this[key] = val
        }
        return true
      }
    })
  }
}
