import React from "react";
import { BrowserRouter } from "react-router-dom";
import PlaylistInformation from "../../Playlist/PlaylistInformation";

describe("<PlaylistInformation />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <PlaylistInformation />
      </BrowserRouter>
    );
  });
});
