var mount = require('./mount')

var update = function (oldElement, nextElement, parentDOMNode) {
  // create node and add to DOM tree if we have
  // an element that wasn't there before
  if (oldElement === undefined) {
    mount(nextElement, parentDOMNode)
    return
  }

  // this is where we are going to make the dom changes
  // so we put it apart on its own variable
  var dom = oldElement.dom

  // 1. update text of child is of text type
  if (typeof nextElement === 'string' || typeof nextElement === 'number') {
    if (nextElement.length) {
      parentDOMNode.innerText = nextElement
    } else {
      parentDOMNode.innerText = ''
    }
  }

  // 2. update node if type is different
  if (nextElement.type !== oldElement.type) {
    // 2.2 copy node to change type
    parentDOMNode.replaceChild(mount(nextElement, parentDOMNode), dom)
  }

  // 3. iterate over children if any
  if (nextElement.children) {
    // 3.1 call update again on each children to compare them
    // to each other
    for (var i = 0; i < nextElement.children.length; i++) {
      update(oldElement.children[i], nextElement.children[i], dom)
    }
  }

  // 4. compare old node to new node props to make dom changes
  if (nextElement.props) {
    Object.keys(nextElement.props).forEach(function (key) {
      if (nextElement.props[key] !== oldElement.props[key]) {
        // 4.1 update dom attributes with new props
        // if prop is not an event
        if (key.slice(0, 2) !== 'on') {
          if (key === 'className') {
            dom.className = nextElement.props[key]
          } else {
            dom.setAttribute(key, nextElement.props[key])
          }
        } else {
          // 4.2 replace event listener with new function if
          // prop changed in newElement
          dom.removeEventListener(key.slice(2), oldElement.props[key])
          dom.addEventListener(key.slice(2), nextElement.props[key])
        }
      }
    })
  }
}

module.exports = update