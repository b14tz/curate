import React from "react";
import { BrowserRouter } from "react-router-dom";
import ListSearch from "../../SearchResults/ListSearch";

describe("<ListSearch />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <ListSearch />
      </BrowserRouter>
    );
  });
});
