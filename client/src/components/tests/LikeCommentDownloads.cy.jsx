import React from "react";
import { BrowserRouter } from "react-router-dom";
import LikeCommentDownloads from "../LikeCommentDownloads";

describe("<LikeCommentDownloads />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <LikeCommentDownloads />
      </BrowserRouter>
    );
  });
});
