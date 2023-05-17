import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Comment from '../Comment'

describe('<Comment />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BrowserRouter><Comment /></BrowserRouter>)
  })
})
