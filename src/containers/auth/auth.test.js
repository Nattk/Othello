import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'

import Auth from './auth'

describe(' AUTH ', function () {
  it('should Render', function () {
    const element = <Auth/>
    const shallowRenderer = new ShallowRenderer()
    shallowRenderer.render(element)
    const component = shallowRenderer.getRenderOutput()
    expect(component.props.className).toBe('auth')
  })
})
