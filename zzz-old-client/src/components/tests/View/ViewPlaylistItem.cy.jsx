import React from "react";
import { BrowserRouter } from "react-router-dom";
import ViewPlaylistItem from "../../View/ViewPlaylistItem";

describe("<ViewPlaylistItem />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <ViewPlaylistItem />
      </BrowserRouter>
    );
  });
});
