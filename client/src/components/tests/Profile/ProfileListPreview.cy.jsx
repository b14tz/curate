import React from 'react'
import ProfileListPreview from '../../Profile/ProfileListPreview'
import { BrowserRouter } from 'react-router-dom'

describe('<ProfileListPreview />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BrowserRouter><ProfileListPreview /></BrowserRouter>)
  })
})
