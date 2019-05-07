
export default class Vue {
  constructor (options) {
    this.$options = options
    
    this.initWatch()

    const proxy = this.initDataProxy()

    return proxy

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
    return new Proxy(this, {
      get: (_, key, receiver) => {
        if (key in _) return _[key]
        return data[key]
      },
      set: (_, key, val, receiver) => {
        const pre = data[key]
        if (pre === val) return
        data[key] = val
        this.notifyChange(key, pre, val)
        return true
      }
    })
  }
}
