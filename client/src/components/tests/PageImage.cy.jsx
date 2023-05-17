import React from 'react'
import PageImage from '../PageImage'

describe('<PageImage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PageImage />)
  })
})
