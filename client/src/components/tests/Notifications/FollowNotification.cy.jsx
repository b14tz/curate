import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import FollowNotification from '../../Notifications/FollowNotification'

describe('<FollowNotification />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BrowserRouter><FollowNotification /></BrowserRouter>)
  })
})
