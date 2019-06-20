let _target

export function setTarget (vm) {
  _target = vm
}

export function clearTarget () {
  _target = null
}

function collect (fullPath, vm) {
  if (_target) {
    vm.$watch(fullPath, _target.update.bind(_target))
  }
}

function createProxyHandler (vm, path) {
  return {
    get: (data, key) => {
      const fullPath = path ? path + '.' + key : key

      collect(fullPath, vm)

      if (typeof data[key] === 'object' && data[key] !== null) {
        return new Proxy(data[key], createProxyHandler(vm, fullPath))
      } else {
        return data[key]
      }
    },
    set: (data, key, val) => {
      const fullPath = path ? path + '.' + key : key

      const pre = data[key]
      data[key] = val

      vm.notifyChange(fullPath, pre, val)
      return true
    },
    deleteProperty: (data, key) => {
      if (key in data) {
        const fullPath = path ? path + '.' + key : key
        const pre = data[key]
        delete data[key]
        vm.notifyChange(fullPath, pre)
      }
      return true
    }
  }
}

export function createProxy (vm) {

  const data = vm.$data = vm.$options.data ? vm.$options.data() : {}
  const methods = vm.$methods = vm.$options.methods || {}
  const computed = vm.$options.computed || {}
  const props = vm._props || {}
  return new Proxy(vm, {
    get: (_, key) => {
      if (key in props) {
        return createProxyHandler(vm).get(props, key)
      }
      if (key in data) {
        return createProxyHandler(vm).get(data, key)
      }
      if (key in computed) {
        return computed[key].call(vm.proxy)
      }
      if (key in methods) return vm.$methods[key].bind(vm.proxy)
      return vm[key]
    },
    set: (_, key, val) => {
      const pre = data[key] || vm[key]

      if (key in props) {
        return createProxyHandler(vm).set(props, key, val)
      }

      if (key in data) {
        return createProxyHandler(vm).set(data, key, val)
      }

      vm[key] = val

      return true
    }
  })

}