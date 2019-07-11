import {setTarget, clearTarget} from './proxy'
import {queueWatcher} from './schedule'

let id = 0
export function getWatcherId () {
  return id++
}

export class Watcher {
  constructor (vm, key, cb) {
    this.id = getWatcherId()
    this.vm = vm
    this.key = key
    this.cb = cb
  }
  update ({pre, val}) {
    this.pre = pre
    this.val = val
    queueWatcher(this)
  }
  run () {
    this.cb.call(this.vm, this.pre, this.val)
  }
}

export class ComputedWatcher {
  constructor (vm, fn, cb) {
    this.id = getWatcherId()
    this.vm = vm
    this.fn = fn
    this.cb = cb
    setTarget(this)
    this.val = this._get()
    clearTarget()
  }
  update () {
    this.oldVal = this.val
    this.val = this._get()
    debugger
    queueWatcher(this)
  }

  run () {
    this.cb.call(this.vm, this.oldVal, this.val)
  }

  _get () {
    return this.fn.call(this.vm)
  }
}
