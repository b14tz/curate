import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AlbumSearch from '../../SearchResults/AlbumSearch'

describe('<AlbumSearch />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BrowserRouter><AlbumSearch /></BrowserRouter>)
  })
})
