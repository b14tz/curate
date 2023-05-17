import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ViewList from '../../View/ViewList'

describe('<ViewList />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BrowserRouter><ViewList /></BrowserRouter>)
  })
})
