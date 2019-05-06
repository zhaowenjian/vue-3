
export default class Vue {
  constructor (options) {
    this.$options = options
    const data = options.data()
    return new Proxy(this, {
      get (_, key, receiver) {
        return data[key]
      },
      set (_, key, val, receiver) {
        data[key] = val
      }
    })
  }
}
