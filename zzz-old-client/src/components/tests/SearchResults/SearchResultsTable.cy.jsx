import React from "react";
import { BrowserRouter } from "react-router-dom";
import SearchResultsTable from "../../SearchResults/SearchResultsTable";

describe("<SearchResultsTable />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <SearchResultsTable />
      </BrowserRouter>
    );
  });
});
