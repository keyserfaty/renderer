var h = require('../src/h')

describe('basic functionality', function () {
  it('should return an element', function () {
    var received = h('div')

    var expected = {
      type: 'div',
      props: undefined,
      children: [],
      dom: null
    }

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

describe('props behaviour', function () {
  it('should return a list of props', function () {
    var received = h('div', { className: 'parent', 'style': 'background: red' })

    var expected = {
      type: 'div',
      props: {
        className: 'parent',
        style: 'background: red'
      },
      children: [],
      dom: null
    }

    expect(received).toEqual(expected)
  })

  it('should return events', function () {
    var received = h('div', { onclick: function (a, b) { return a + b } } )

    var expected = {
      type: 'div',
      props: {
        onclick: function (a, b) { return a + b }
      },
      children: [],
      dom: null
    }

    expect(received.props.onclick(1, 2)).toEqual(expected.props.onclick(1, 2))
  })
})