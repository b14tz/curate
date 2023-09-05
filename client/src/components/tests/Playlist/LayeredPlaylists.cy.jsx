import React from "react";
import LayeredPlaylists from "../../Playlist/LayeredPlaylists";

describe("<LayeredPlaylists />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LayeredPlaylists />);
  });
});
