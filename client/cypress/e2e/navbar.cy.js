context('NavBar', () => {

beforeEach(() => {
        cy.visit('/discover').wait(1000).blur();
});

it('signup/login for navbar testing', () => {
    cy.visit('/signup');

    cy.get('input[id="username"]').as('username');
    cy.get('input[id="firstName"]').as('firstName');
    cy.get('input[id="lastName"]').as('lastName');
    cy.get('input[id="email"]').as('email');
    cy.get('input[id="password"]').as('password');
    cy.get('input[id="confirmPassword"]').as('confirmPassword');
    cy.get('Button[id="signup"]').as('signup');

    cy.get('@username').type("testUsername").blur();
    cy.get('@firstName').type("Evan").blur();
    cy.get('@lastName').type("Brewer").blur();
    cy.get('@email').type("navbar@gmail.com").blur();
    cy.get('@password').type("password123").blur();
    cy.get('@confirmPassword').type("password123").blur();

    cy.get('@signup').click().wait(1000);
});

it('Profile button should visit the Profile page', () => {
    cy.get('Button[id="dropdownButton"').as('dropdown');
    cy.get('li[id="profileButton"').as('profile');

    cy.get('@dropdown').click();
    cy.get('@profile').click().wait(1000)
    .then(() => {
      cy.location().should((loc) => {
        const location = loc;
        expect(location.pathname).to.equal("/my-profile");
      });
    });
});

it('Feed button should visit the Feed page', () => {
    cy.get('a[id="feedButton"]').as('feed');
    cy.get('@feed').click().wait(1000)
    .then(() => {
      cy.location().should((loc) => {
        const location = loc;
        expect(location.pathname).to.equal("/feed");
      });
    });
});

it('Curate button should visit the Discover page', () => {
    cy.get('a[id="curateButton"]').as('curate');
    cy.get('@curate').click().wait(1000)
    .then(() => {
      cy.location().should((loc) => {
        const location = loc;
        expect(location.pathname).to.equal("/discover");
      });
    });
});

it('Discover button should visit the Discover page', () => {
    cy.get('a[id="discoverButton"]').as('discover');
    cy.get('@discover').click().wait(1000)
    .then(() => {
      cy.location().should((loc) => {
        const location = loc;
        expect(location.pathname).to.equal("/discover");
      });
    });
});

it('Notification button should visit the Profile page', () => {
    cy.get('Button[id="dropdownButton"').as('dropdown');
    cy.get('li[id="notificationsButton"').as('notification');

    cy.get('@dropdown').click();
    cy.get('@notification').click().wait(1000)
    .then(() => {
      cy.location().should((loc) => {
        const location = loc;
        expect(location.pathname).to.equal("/my-profile");
      });
    });
});

it('log out', () => {
    cy.get('Button[id="dropdownButton"').as('dropdown');
    cy.get('li[id="logoutButton"').as('logout');

    cy.get('@dropdown').click();
    cy.get('@logout').click().wait(1000)
    .then(() => {
      cy.location().should((loc) => {
        const location = loc;
        expect(location.pathname).to.equal("/login");
      });
    });
});

it('should visit the Login page', () => {
    cy.get('Button[id="loginButton"]').as('login');
    cy.get('@login').click().wait(1000)
    .then(() => {
      cy.location().should((loc) => {
        const location = loc;
        expect(location.pathname).to.equal("/login");
      });
    });
});

});