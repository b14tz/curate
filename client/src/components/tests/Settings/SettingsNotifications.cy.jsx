import React from 'react'
import SettingsNotifications from '../../Settings/SettingsNotifications'

describe('<SettingsNotifications />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SettingsNotifications />)
  })
})
