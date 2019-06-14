import VNode from './vnode'
import Vue from '@/main'

export function createElement (tag, data, children) {
  const components = this.$options.components || {}
  if (tag in components) {
    return new VNode(tag, data, children, components[tag])
  }
  return new VNode(tag, data, children)
}

export function createEl (vnode, vm) {
  const {tag, data, children, componentOptions} = vnode

  if (componentOptions) {
    const componentInstance = new Vue(Object.assign({}, componentOptions, {propsData: data.props}))
    vnode.componentInstance = componentInstance
    componentInstance._events = (data || {}).on || {}
    componentInstance.$mount()
    return componentInstance.$el
  }
  const el = document.createElement(tag)
  el.__vue__ = vm

  if (data) {
    const {on = {}, attrs = {}, className} = data
    for (let key in attrs) {
      el.setAttribute(key, attrs[key])
    }
    for (let key in on) {
      el.addEventListener(key, on[key])
    }
    className && el.setAttribute('class', className)
  }
  if (isStringNumber(children)) {
    el.textContent = children
  } else if (Array.isArray(children)) {
    children.forEach(child => {
      if (isStringNumber(child)) {
        const textEl = document.createElement(text)
        textEl.textContent = child
        el.appendChild(textEl)
      } else {
        el.appendChild(createEl(child))
      }
    })
  }

  return el
}

function isStringNumber (obj) {
  return typeof obj === 'string' || typeof obj === 'number'
}
