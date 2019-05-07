import VNode from './vnode'

export function createElement (tag, data, children) {
  return new VNode(tag, data, children)
}

export function createEl (vnode, vm) {
  const {tag, data, children} = vnode
  const el = document.createElement(tag)

  if (data) {
    const {listeners = {}} = data
    for (let key in data) {
      el.setAttribute(key, data[key])
    }
    for (let key in listeners) {
      el.addEventListener(key, listeners[key])
    }
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
