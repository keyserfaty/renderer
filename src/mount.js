var mount = function (element, parentDOMNode) {
  // 1. convert element to DOM element
  var nodeElem = document.createElement(element.type)

  // 2. set node attributes
  if (element.props) {
    Object.keys(element.props).forEach(function (key) {
      // 2.1 set string attributes & avoid events
      if (key.slice(0, 2).toLowerCase() !== 'on') {
        if (key === 'className') {
          nodeElem.className = element.props[key]
        } else {
          nodeElem.setAttribute(key, element.props[key])
        }
      } else {
      // 2.2 append events to node
        nodeElem.addEventListener(key, element.props[key])
      }
    })
  }

  // 3. set children elements if any
  element.children.forEach(function (child) {
    return mount(child, nodeElem)
  })

  // 4. add reference to dom node
  element.dom = nodeElem

  // 5. append node to parent
  parentDOMNode.appendChild(nodeElem)

  // 6. return dom element
  return nodeElem
}

module.exports = mount