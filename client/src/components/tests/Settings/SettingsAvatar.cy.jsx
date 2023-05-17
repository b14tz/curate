import React from 'react'
import SettingsAvatar from '../../Settings/SettingsAvatar'

describe('<SettingsAvatar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SettingsAvatar />)
  })
})
