import React from 'react'
import Spinner from './spinner'
import TestUtils from 'react-dom/test-utils'

describe(' GameListCard ', function () {
  it('should Render', function () {
    const component = <Spinner/>
    expect(TestUtils.isElement(component)).toBe(true)
  })
})
