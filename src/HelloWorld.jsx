import {createElement} from 'react'

const HelloWorld = ({name}) => {
  return createElement('div', {}, [
    createElement('a', {
      key: 'guo',
      className: 'testALink',
      onClick: () => {console.log('hello' + name)}
    }, name)
  ])
}

export default HelloWorld