import React from "react";
import ProfileHeader from "../../Profile/ProfileHeader";

describe("<ProfileHeader />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ProfileHeader />);
  });
});
