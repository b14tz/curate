import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import TopSongsItem from '../TopSongsItem'

describe('<TopSongsItem />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BrowserRouter><TopSongsItem /></BrowserRouter>)
  })
})
