
export default class VNode {
  constructor (tag, data, children) {
    this.tag = tag
    this.data = data
    this.children = children
  }
}

export function createTextNode (val) {
  return new VNode(undefined, undefined, val)
}
