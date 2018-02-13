var update = function (oldElement, nextElement) {
  // this is where we are going to make the dom changes
  // so we put it apart on its own variable
  var dom = oldElement.dom

  // 1. update children if any
  if (nextElement.children) {
    // 1.1 call update again on each children to compare them
    // to each other
    for (var i = 0; i < nextElement.children.length; i++) {
      update(oldElement.children[i], nextElement.children[i])
    }
  }

  // 2. start comparing old node to new node props to make dom changes
  if (nextElement.props) {
    Object.keys(nextElement.props).forEach(function (key) {
      if (nextElement.props[key] !== oldElement.props[key]) {
        // 1.1 update dom attributes with new props
        // if prop is not an event
        if (nextElement.props.slice(0, 2) !== 'on') {
          dom.setAttribute(key, nextElement.props[key])
        } else {
          // 1.2 update event listener with new function if
          // prop changed in newElement
          dom.addEventListener(key, nextElement.props[key])
        }
      }
    })
  }
}

module.exports = update