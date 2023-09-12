import React from "react";
import { BrowserRouter } from "react-router-dom";
import SongInPlaylist from "../SongInPlaylist";

describe("<SongInPlaylist />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <SongInPlaylist />
      </BrowserRouter>
    );
  });
});
