import React from 'react'
import ViewTitles from '../../View/ViewTitles'

describe('<ViewTitles />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ViewTitles />)
  })
})
