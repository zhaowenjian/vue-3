import {createElement, createEl} from './render'

export default class Vue {
  constructor (options) {
    this.$options = options

    this.initWatch()

    const proxy = this.proxy = this.initDataProxy()

    return proxy
  }

  initDataProxy () {
    const data = this.$data = this.$options.data ? this.$options.data() : {}
    const methods = this.$methods = this.$options.methods || {}
    return new Proxy(this, {
      get: (_, key) => {
        if (key in data) {
          return this.createProxyHandler().get(data, key)
        }
        if (key in methods) return this.$methods[key].bind(this.proxy)
        return this[key]
      },
      set: (_, key, val) => {
        const pre = data[key] || this[key]

        if (key in data) {
          return this.createProxyHandler().set(data, key, val)
        }

        this[key] = val

        return true
      }
    })
  }
  
  $mount (root) {
    const {render, mounted} = this.$options

    const vnode = render.call(this.proxy, createElement)
    this.$el = createEl(vnode, this.proxy)

    if (root) {
      const parent = root.parentElement
      parent.removeChild(root)
      parent.appendChild(this.$el)
    }

    mounted && mounted.call(this.proxy)

    return this
  }

  patch (oldVnode, newVnode) {
    return createEl(newVnode, this)
  }

  update () {
    const {render} = this.$options
    const parentNode = this.$el.parentElement
    const vnode = render.call(this.proxy, createElement)
    const temp = this.$el
    this.$el = this.patch(null, vnode)
    if (parentNode) {
      parentNode.removeChild(temp)
      parentNode.appendChild(this.$el)
    }
  }

  createProxyHandler (path) {
    return {
      get: (data, key) => {
        const fullPath = path ? path + '.' + key : key

        this.collect(fullPath)

        if (typeof data[key] === 'object' && data[key] !== null) {
          return new Proxy(data[key], this.createProxyHandler(fullPath))
        } else {
          return data[key]
        }
      },
      set: (data, key, val) => {
        const fullPath = path ? path + '.' + key : key

        const pre = data[key]
        data[key] = val

        this.notifyChange(fullPath, pre, val)
        return true
      }
    }

  }

  collect (fullPath) {
    this.collected = this.collected || {}
    if (!this.collected[fullPath]) {
      this.$watch(fullPath, this.update.bind(this))
      this.collected[fullPath] = true
    }
  }

  notifyChange (key, pre, val) {
    (this.watchChain[key] || []).forEach(cb => cb(pre, val))
  }

  $watch (key, cb) {
    this.watchChain[key] = this.watchChain[key] || []
    this.watchChain[key].push(cb)
  }

  initWatch () {
    this.watchChain = {}
  }
}
