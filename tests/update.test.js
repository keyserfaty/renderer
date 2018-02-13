var update = require('../index').update

describe('basic functionality', function () {
  it('should return a DOM element', function () {
    var received = mount({
      type: 'div',
      props: {
        className: 'name',
        onclick: function (a, b) { return a + b },
        style: 'background-color: red; color: black;',
        autofocus: true,
        disabled: true
      },
      children: [],
      dom: null
    }, '')

    console.log(received)

    var expected = {
      nodeType: 'div',
      attrs: undefined,
      children: []
    }

    expect(received).toEqual(expected)
    expect(received).toEqual(expected)
    expect(received).toEqual(expected)
  })

  it('should return an element with props', function () {
    var received = h('div', { className: 'name' })

    var expected = {
      type: 'div',
      props: {
        className: 'name'
      },
      children: [],
      dom: null
    }

    expect(received).toEqual(expected)
  })

  it('should return an element with props and a child', function () {
    var received =
      h('div', { className: 'parent' },
        h('div', { className: 'child' })
      )

    var expected = {
      type: 'div',
      props: {
        className: 'parent'
      },
      children: [{
        type: 'div',
        props: {
          className: 'child'
        },
        children: [],
        dom: null
      }],
      dom: null
    }

    expect(received).toEqual(expected)
  })

  it('should return an element with props and multiple children', function () {
    var received =
      h('div', { className: 'parent' },
        h('div', { className: 'child' },
          h('div', { className: 'grand-child-1' }),
          h('div', { className: 'grand-child-2' }),
          h('div', { className: 'grand-child-3' },
            h('div', { className: 'grand-grand-child' })
          )
        )
      )

    var expected = {
      type: 'div',
      props: {
        className: 'parent'
      },
      children: [{
        type: 'div',
        props: {
          className: 'child'
        },
        children: [{
          type: 'div',
          props: {
            className: 'grand-child-1'
          },
          children: [],
          dom: null
        }, {
          type: 'div',
          props: {
            className: 'grand-child-2'
          },
          children: [],
          dom: null
        }, {
          type: 'div',
          props: {
            className: 'grand-child-3'
          },
          children: [{
            type: 'div',
            props: {
              className: 'grand-grand-child'
            },
            children: [],
            dom: null
          }],
          dom: null
        }],
        dom: null
      }],
      dom: null
    }

    expect(received).toEqual(expected)
  })

  it('should return an element with text as child', function () {
    var received = h('div', {}, 'some text')

    var expected = {
      type: 'div',
      props: {},
      children: ['some text'],
      dom: null
    }

    expect(received).toEqual(expected)
  })
})
