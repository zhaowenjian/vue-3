import nextTick from './nextTick'

const flushCallbacks = []
let has = {}

export function queueWatcher (watcher) {
  
  const id = watcher.id

  if (!has[id]) {
    has[id] = true
    flushCallbacks.push(watcher)
    nextTick(flushScheduleQueue)
  }
}

function flushScheduleQueue () {
  flushCallbacks.sort((a, b) => a.id - b.id)

  for (let watcher of flushCallbacks) {
    watcher.run()
  }

  resetState()
}

function resetState () {
  flushCallbacks.length = 0
  has = {}
}

