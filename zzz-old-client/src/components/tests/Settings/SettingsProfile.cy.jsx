import React from "react";
import SettingsProfile from "../../Settings/SettingsProfile";

describe("<SettingsProfile />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SettingsProfile />);
  });
});
