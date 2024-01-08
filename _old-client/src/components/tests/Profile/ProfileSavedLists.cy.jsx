import React from "react";
import { BrowserRouter } from "react-router-dom";
import ProfileSavedLists from "../../Profile/ProfileSavedLists";

describe("<ProfileSavedLists />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <ProfileSavedLists />
      </BrowserRouter>
    );
  });
});
