import React from "react";
import { BrowserRouter } from "react-router-dom";
import Playlist from "../Playlist";

describe("<Playlist />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <Playlist />
      </BrowserRouter>
    );
  });
});
