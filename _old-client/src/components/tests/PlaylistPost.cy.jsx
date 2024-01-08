import React from "react";
import PlaylistPost from "../PlaylistPost";

describe("<PlaylistPost />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PlaylistPost />);
  });
});
