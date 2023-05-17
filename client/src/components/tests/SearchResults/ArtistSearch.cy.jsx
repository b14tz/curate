import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ArtistSearch from '../../SearchResults/ArtistSearch'

describe('<ArtistSearch />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BrowserRouter><ArtistSearch /></BrowserRouter>)
  })
})
