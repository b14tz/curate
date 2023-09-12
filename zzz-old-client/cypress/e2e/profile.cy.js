import { beforeAuthStateChanged } from "firebase/auth";

context("Profile", () => {
  beforeEach(() => {
    cy.visit("/profile").wait(1000).blur();
  });

  it("signup", () => {
    cy.visit("/signup");

    cy.get('input[id="username"]').as("username");
    cy.get('input[id="firstName"]').as("firstName");
    cy.get('input[id="lastName"]').as("lastName");
    cy.get('input[id="email"]').as("email");
    cy.get('input[id="password"]').as("password");
    cy.get('input[id="confirmPassword"]').as("confirmPassword");
    cy.get('Button[id="signup"]').as("signup");

    cy.get("@username").type("testUsername").blur();
    cy.get("@firstName").type("Evan").blur();
    cy.get("@lastName").type("Brewer").blur();
    cy.get("@email").type("profile@gmail.com").blur();
    cy.get("@password").type("password123").blur();
    cy.get("@confirmPassword").type("password123").blur();

    cy.get("@signup").click().wait(1000);
  });

  it("log out", () => {
    cy.get('Button[id="dropdownButton"').as("dropdown");
    cy.get('li[id="logoutButton"').as("logout");

    cy.get("@dropdown").click();
    cy.get("@logout")
      .click()
      .wait(1000)
      .then(() => {
        cy.location().should((loc) => {
          const location = loc;
          expect(location.pathname).to.equal("/login");
        });
      });
  });
});
