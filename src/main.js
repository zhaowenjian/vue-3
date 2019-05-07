import {createElement, createEl} from './render'

export default class Vue {
  constructor (options) {
    this.$options = options
    
    this.initWatch()

    this.proxy = this.initDataProxy()

    return this.proxy
  }

  $mount (root) {
    const {render, mounted} = this.$options

    const vnode = render.call(this.proxy, createElement)

    this.$el = createEl(vnode)

    if (root) {
      root.appendChild(this.$el)
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
        if (key in _) return _[key]
        if (key in methods) return methods[key].bind(this.proxy)
        return data[key]
      },
      set: (_, key, val, receiver) => {
        const pre = data[key] || this[key]
        if (pre === val) return
        if (key in data) {
          data[key] = val
        } else {
          this[key] = val
        }
        this.notifyChange(key, pre, val)
        return true
      }
    })
  }
}
