import React from "react";
import { BrowserRouter } from "react-router-dom";
import ViewPlaylistComment from "../../View/ViewPlaylistComment";

describe("<ViewPlaylistComment />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <ViewPlaylistComment />
      </BrowserRouter>
    );
  });
});
