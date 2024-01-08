import React from "react";
import { BrowserRouter } from "react-router-dom";
import PostNotification from "../../Notifications/PostNotification";

describe("<PostNotification />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <PostNotification />
      </BrowserRouter>
    );
  });
});
