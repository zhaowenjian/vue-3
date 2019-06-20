import {remove} from './utils'

export default class Dep {
  constructor () {
    this.subs = []
  }

  addSub (watcher) {
    this.subs.push(watcher)
  }

  removeSub (wather) {
    remove(this.subs, sub)
  }

  notify (param) {
    const subs = this.subs

    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update(param)
    }
  }
}