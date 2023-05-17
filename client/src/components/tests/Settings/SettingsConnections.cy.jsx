import React from 'react'
import SettingsConnections from '../../Settings/SettingsConnections'

describe('<SettingsConnections />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SettingsConnections />)
  })
})
