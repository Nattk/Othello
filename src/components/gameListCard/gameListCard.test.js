import React from 'react'
import GameListCard from './gameListCard'
import TestUtils from 'react-dom/test-utils'

describe(' GameListCard ', function () {
  it('should Render', function () {
    const component = <GameListCard/>
    expect(TestUtils.isElement(component)).toBe(true)
  })
})
