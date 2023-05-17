import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import SongListItem from '../SongListItem'

describe('<SongListItem />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BrowserRouter><SongListItem /></BrowserRouter>)
  })
})
