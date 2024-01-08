import React from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "../NavBar";

describe("<NavBar />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
  });
});
