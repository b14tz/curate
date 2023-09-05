context("Login", () => {
  beforeEach(() => {
    cy.visit("/login").wait(1000).blur();
  });

  it("can fill out the Username field", () => {
    cy.get('input[id="enter-email"').as("email");
    cy.get("@email").type("test@gmail.com").blur();
    cy.get("@email")
      .invoke("val")
      .then((text) => {
        const email = text;
        expect(email).to.equal("test@gmail.com");
        expect(email).to.not.equal("notTest@gmail.com");
      });
  });

  it("can redirect to the signup page", () => {
    cy.get('a[id="signupLink"]').as("sb");
    cy.get("@sb")
      .click()
      .wait(1000)
      .then(() => {
        cy.location().should((loc) => {
          const location = loc;
          expect(location.pathname).to.equal("/signup");
        });
      });
  });

  it("can fill out the Password field", () => {
    cy.get('input[id="password"').as("password");

    cy.get("@password").type("password").blur();
    cy.get("@password")
      .invoke("val")
      .then((text) => {
        const password = text;
        expect(password).to.equal("password");
        expect(password).to.not.equal("Notpassword");
      });
  });

  it("should fail to login to an uncreated account", () => {
    cy.get('input[id="enter-email"]').as("email");
    cy.get('input[id="password"]').as("password");
    cy.get('Button[id="loginPost"]').as("login");
    cy.get("@email").type("testLoginFail@gmail.com").blur();
    cy.get("@password").type("password").blur();

    cy.get("@login")
      .click()
      .wait(1000)
      .then(() => {
        cy.location().should((loc) => {
          const location = loc;
          expect(location.pathname).to.equal("/login");
        });
      });
  });

  it("should be able to fill in the reset password fields after clicking the Reset Password button", () => {
    cy.get('Button[id="resetPasswordButton"]').as("rp");

    cy.get("@rp").click();

    cy.get('input[id="email"]').as("rpEmail");
    cy.get('input[id="new-password"]').as("np");
    cy.get('input[id="confirm-password"]').as("cp");

    cy.get("@rpEmail").type("email@gmail.com").blur();
    cy.get("@rpEmail")
      .invoke("val")
      .then((text) => {
        const email = text;
        expect(email).to.equal("email@gmail.com");
        expect(email).to.not.equal("notEmail@gmail.com");
      });

    cy.get("@np").type("password").blur();
    cy.get("@np")
      .invoke("val")
      .then((text) => {
        const password = text;
        expect(password).to.equal("password");
        expect(password).to.not.equal("notPassword");
      });

    cy.get("@cp").type("password").blur();
    cy.get("@cp")
      .invoke("val")
      .then((text) => {
        const password = text;
        expect(password).to.equal("password");
        expect(password).to.not.equal("notPassword");
      });
  });

  it("reset password email should be autofilled from login email field", () => {
    cy.get('Button[id="resetPasswordButton"]').as("rp");
    cy.get('input[id="enter-email"]').as("email");

    cy.get("@email").type("email@gmail.com");

    cy.get("@rp").click();

    cy.get('input[id="email"]').as("rpEmail");
    cy.get("@rpEmail")
      .invoke("val")
      .then((text) => {
        const email = text;
        expect(email).to.equal("email@gmail.com");
        expect(email).to.not.equal("notEmail@gmail.com");
      });
  });

  it("should login to a created account", () => {
    cy.visit("/signup");
    cy.get('input[id="username"]').as("username");
    cy.get('input[id="firstName"]').as("firstName");
    cy.get('input[id="lastName"]').as("lastName");
    cy.get('input[id="email"]').as("email");
    cy.get('input[id="password"]').as("password");
    cy.get('input[id="confirmPassword"]').as("confirmPassword");
    cy.get('Button[id="signup"]').as("signup");

    cy.get("@username").type("login").blur();
    cy.get("@firstName").type("login").blur();
    cy.get("@lastName").type("login").blur();
    cy.get("@email").type("login@gmail.com").blur();
    cy.get("@password").type("password").blur();
    cy.get("@confirmPassword").type("password").blur();

    cy.get("@signup").click();
    cy.get('Button[id="dropdownButton"').as("dropdown");
    cy.get('li[id="logoutButton"').as("logout");

    cy.get("@dropdown").click();
    cy.get("@logout").click();

    cy.get('input[id="enter-email"]').as("email");
    cy.get('input[id="password"]').as("password");
    cy.get('Button[id="loginPost"]').as("login");
    cy.get("@email").type("login@gmail.com").blur();
    cy.get("@password").type("password").blur();

    cy.get("@login")
      .click()
      .wait(1000)
      .then(() => {
        cy.location().should((loc) => {
          const location = loc;
          expect(location.pathname).to.equal("/my-profile");
        });
      });
  });

  it("should redirect to the discover page if already logged in", () => {
    cy.visit("/login")
      .wait(1000)
      .then(() => {
        cy.location().should((loc) => {
          const location = loc;
          expect(location.pathname).to.equal("/discover");
        });
      });

    cy.get('Button[id="dropdownButton"').as("dropdown");
    cy.get('li[id="logoutButton"').as("logout");

    cy.get("@dropdown").click();
    cy.get("@logout").click();
  });
});
