import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import UserSearch from '../../SearchResults/UserSearch'

describe('<UserSearch />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BrowserRouter><UserSearch /></BrowserRouter>)
  })
})
