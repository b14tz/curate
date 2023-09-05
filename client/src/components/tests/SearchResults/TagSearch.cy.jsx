import React from "react";
import { BrowserRouter } from "react-router-dom";
import TagSearch from "../../SearchResults/TagSearch";

describe("<TagSearch />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <TagSearch />
      </BrowserRouter>
    );
  });
});
