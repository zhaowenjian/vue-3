
let callbacks = []

const p = Promise.resolve()

const nextTickHandler = () => {
  const copies = callbacks.slice(0)
  for (let cb of copies) {
    cb()
  }
}

let pending = false
const logError = (error) => console.log(error)

let timeFuc = () => {
  pending = false
  p.then(nextTickHandler).catch(logError)
}

export default function nextTick (cb, context) {
  callbacks.push(() => {
    return cb.call(context)
  })

  if (!pending) {
    pending = true
    timeFuc()
  }
}
