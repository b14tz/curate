import React from "react";
import PlaylistSave from "../PlaylistSave";

describe("<PlaylistSave />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PlaylistSave />);
  });
});
