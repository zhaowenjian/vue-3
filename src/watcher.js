
export default class Watcher {
  constructor (vm, fn, cb) {
    this.vm = vm
    this.fn = fn
    this.cb = cb
    vm._target = this
    this.val = fn.call(vm)
    vm._target = null
  }
  update () {
    const oldVal = this.val
    this.val = this.fn.call(this.vm)
    this.cb.call(this.vm, oldVal, this.val)
  }
}
