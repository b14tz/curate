import React from "react";
import { BrowserRouter } from "react-router-dom";
import ViewArtAndLinks from "../../View/ViewArtAndLinks";

describe("<ViewArtAndLinks />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <ViewArtAndLinks />
      </BrowserRouter>
    );
  });
});
