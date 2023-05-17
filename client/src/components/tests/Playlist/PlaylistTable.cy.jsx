import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import PlaylistTable from '../../Playlist/PlaylistTable'

describe('<PlaylistTable />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BrowserRouter><PlaylistTable /></BrowserRouter>)
  })
})
