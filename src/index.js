var h = function (type, props) {
  var children = Array.prototype.slice.call(arguments, h.length)

  return {
    type: type,
    props: props,
    children: children,
    dom: null
  }
}

module.exports = h