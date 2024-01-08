import React from "react";
import { BrowserRouter } from "react-router-dom";
import PageImageWithOnlyHeart from "../PageImageWithOnlyHeart";

describe("<PageImageWithOnlyHeart />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <PageImageWithOnlyHeart />
      </BrowserRouter>
    );
  });
});
