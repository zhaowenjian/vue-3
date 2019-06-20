import {setTarget, clearTarget} from './proxy'

export class Watcher {
  constructor (vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
  }
  update ({pre, val}) {
    this.cb.call(this.vm, pre, val)
  }
}

export class ComputedWatcher {
  constructor (vm, fn, cb) {
    this.vm = vm
    this.fn = fn
    this.cb = cb
    setTarget(this)
    this.val = this._get()
    clearTarget()
  }
  update () {
    const oldVal = this.val
    this.val = this._get()
    this.cb.call(this.vm, oldVal, this.val)
  }

  _get () {
    return this.fn.call(this.vm)
  }
}
