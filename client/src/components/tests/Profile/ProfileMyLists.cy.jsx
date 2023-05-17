import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ProfileMyLists from '../../Profile/ProfileMyLists'

describe('<ProfileMyLists />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BrowserRouter><ProfileMyLists /></BrowserRouter>)
  })
})
