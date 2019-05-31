
export default class VNode {
  constructor (tag, data, children, componentOptions, componentInstance) {
    this.tag = tag
    this.data = data
    this.children = children
    this.componentOptions = componentOptions
    this.componentInstance = componentInstance
  }
}

export function createTextNode (val) {
  return new VNode(undefined, undefined, val)
}
