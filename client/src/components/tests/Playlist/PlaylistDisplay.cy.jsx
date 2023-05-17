import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import PlaylistDisplay from '../../Playlist/PlaylistDisplay'

describe('<PlaylistDisplay />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BrowserRouter><PlaylistDisplay /></BrowserRouter>)
  })
})
