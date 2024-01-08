import React from "react";
import { BrowserRouter } from "react-router-dom";
import SongSearch from "../../SearchResults/SongSearch";

describe("<SongSearch />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <SongSearch />
      </BrowserRouter>
    );
  });
});
