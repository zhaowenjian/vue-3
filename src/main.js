import {createElement, createEl} from './render'
import {Watcher, ComputedWatcher} from './watcher'
import {createProxy, setTarget, clearTarget} from './proxy'
import Dep from './Dep'

export default class Vue {
  constructor (options) {
    this.$options = options

    this.initProps()

    this.initWatcher()

    const proxy = this.proxy = createProxy(this)
 
    this.initWatch()

    return proxy
  }

  initProps () {
    const {props, propsData} = this.$options
    this._props = {}

    if (!propsData || !props.length) return

    props.forEach((prop) => {
      this._props[prop] = propsData[prop]
    })
  }

  $mount (root) {
    this.$el = root

    const {mounted} = this.$options

    setTarget(this)
    this.update()
    clearTarget()

    mounted && mounted.call(this.proxy)

    return this
  }

  patch (oldVnode, newVnode) {
    return createEl(newVnode, this)
  }

  $emit (...args) {
    const [name, ...rest] = args
    const cb = this._events[name]
    cb && cb(...rest)
  }

  update () {
    const {render} = this.$options
    const parentNode = (this.$el || {}).parentElement
    const vnode = render.call(this.proxy, createElement.bind(this))
    const temp = this.$el
    this.$el = this.patch(null, vnode)
    if (parentNode) {
      parentNode.removeChild(temp)
      parentNode.appendChild(this.$el)
    }
  }

  notifyChange (key, pre, val) {
    const dep = this.deps[key]
    dep && dep.notify({pre, val})
  }

  $watch (key, cb) {
    if (!this.deps[key]) {
      this.deps[key] = new Dep()
    }
    this.deps[key].addSub(new Watcher(this.proxy, key, cb))
  }

  initWatcher () {
    this.deps = {}
  }

  initWatch () {
    const {watch = {}, computed = {}} = this.$options
    const data = this.$data

    for (let key in watch) {
      if (key in data) {
        this.$watch(key, watch[key].bind(this.proxy))
      } else if (key in computed) {
        new ComputedWatcher(this.proxy, computed[key], watch[key])
      } else {
        throw(new Error('watch error'))
      }
    }
  }
}
