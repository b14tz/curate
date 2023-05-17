import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import NotificationsTable from '../../Notifications/NotificationsTable'

describe('<NotificationsTable />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BrowserRouter><NotificationsTable /></BrowserRouter>)
  })
})
