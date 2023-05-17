context('Signup', () => {
  beforeEach(() => {
    cy.visit('/signup').wait(1000).blur();
  });

  it('can fill out the Username field', () => {
    cy.get('input[id="username"]').as('username');
    
    cy.get('@username').type("testUsername").blur();

    cy.get('@username').invoke('val').then(text => {
      const username = text;
      expect(username).to.equal("testUsername");
      expect(username).to.not.equal("notTestUsername");
    });
  });

  it('can fill out the First Name field', () => {
    cy.get('input[id="firstName"]').as('firstName');
    
    cy.get('@firstName').type("Evan").blur();

    cy.get('@firstName').invoke('val').then(text => {
      const firstName = text;
      expect(firstName).to.equal("Evan");
      expect(firstName).to.not.equal("notEvan");
    });
  });

  it('can fill out the Last Name field', () => {
    cy.get('input[id="lastName"]').as('lastName');
    
    cy.get('@lastName').type("Brewer").blur();

    cy.get('@lastName').invoke('val').then(text => {
      const lastName = text;
      expect(lastName).to.equal("Brewer");
      expect(lastName).to.not.equal("notBrewer");
    });
  });

  it('can fill out the Email field', () => {
    cy.get('input[id="email"]').as('email');
    
    cy.get('@email').type("test@gmail.com").blur();

    cy.get('@email').invoke('val').then(text => {
      const email = text;
      expect(email).to.equal("test@gmail.com");
      expect(email).to.not.equal("notTest@gmail.com");
    });
  });

  it('can fill out the Password field', () => {
    cy.get('input[id="password"]').as('password');
    
    cy.get('@password').type("password123").blur();

    cy.get('@password').invoke('val').then(text => {
      const password = text;
      expect(password).to.equal("password123");
      expect(password).to.not.equal("notPassword123");
    });
  });

  it('can fill out the Retype Password field', () => {
    cy.get('input[id="confirmPassword"]').as('confirmPassword');
    
    cy.get('@confirmPassword').type("password123").blur();

    cy.get('@confirmPassword').invoke('val').then(text => {
      const confirmPassword = text;
      expect(confirmPassword).to.equal("password123");
      expect(confirmPassword).to.not.equal("notPassword123");
    });
  });

  it('can sign up for an account', () => {
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
    cy.get('@email').type("test@gmail.com").blur();
    cy.get('@password').type("password123").blur();
    cy.get('@confirmPassword').type("password123").blur();

    cy.get('@signup').click().wait(1000);

    cy.get('Button[id="dropdownButton"]').as('dropdown');
    cy.get('li[id="profileButton"]').as('profile');

    cy.get('@dropdown').click();
    cy.get('@profile').click().wait(1000)
    .then(() => {
      cy.location().should((loc) => {
        const location = loc;
        expect(location.pathname).to.equal("/my-profile");
      });
    });


  });

  it('should logout after being logged in', () => {
    cy.visit('/discover');
    cy.get('Button[id="dropdownButton"').as('dropdown');
    cy.get('li[id="logoutButton"').as('logout');
    
    cy.get('@dropdown').click();
    cy.get('@logout').click().wait(1000)
    .then(() => {
      cy.location().should((loc) => {
        const location = loc;
        expect(location.pathname).to.equal("/login");
      })
    });
  })

  it('should fail to register duplicate accounts', () => {
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
    cy.get('@email').type("test@gmail.com").blur();
    cy.get('@password').type("password123").blur();
    cy.get('@confirmPassword').type("password123").blur();
    
    cy.get('@signup').click()
    .wait(1000)
    .then(() => {
      cy.location().should((loc) => {
        const location = loc;
        expect(location.pathname).to.equal("/signup");
      });
    });
  });

  it('should fail if any field is not filled out', () => {
    cy.get('input[id="firstName"]').as('firstName');
    cy.get('input[id="lastName"]').as('lastName');
    cy.get('input[id="email"]').as('email');
    cy.get('input[id="password"]').as('password');
    cy.get('input[id="confirmPassword"]').as('confirmPassword');
    cy.get('Button[id="signup"]').as('signup');

    cy.get('@firstName').type("Evan").blur();
    cy.get('@lastName').type("Brewer").blur();
    cy.get('@email').type("email@gmail.com").blur();
    cy.get('@password').type("password123"). blur();
    cy.get('@confirmPassword').type("password123").blur();
    cy.get('@signup').click()
    .wait(1000)
    .then(() => {
      cy.location().should((loc) => {
        const location = loc;
        expect(location.pathname).to.equal("/signup");
      });
    });

    cy.visit('/signup')

    cy.get('input[id="username"]').as('username');
    cy.get('input[id="lastName"]').as('lastName');
    cy.get('input[id="email"]').as('email');
    cy.get('input[id="password"]').as('password');
    cy.get('input[id="confirmPassword"]').as('confirmPassword');
    cy.get('Button[id="signup"]').as('signup');

    cy.get('@username').type("username").blur();
    cy.get('@lastName').type("Brewer").blur();
    cy.get('@email').type("email@gmail.com").blur();
    cy.get('@password').type("password123"). blur();
    cy.get('@confirmPassword').type("password123").blur();
    cy.get('@signup').click()
    .wait(1000)
    .then(() => {
      cy.location().should((loc) => {
        const location = loc;
        expect(location.pathname).to.equal("/signup");
      });
    });

    cy.visit('/signup')

    cy.get('input[id="username"]').as('username');
    cy.get('input[id="firstName"]').as('firstName');
    cy.get('input[id="email"]').as('email');
    cy.get('input[id="password"]').as('password');
    cy.get('input[id="confirmPassword"]').as('confirmPassword');
    cy.get('Button[id="signup"]').as('signup');

    cy.get('@username').type("username").blur();
    cy.get('@firstName').type("Evan").blur();
    cy.get('@email').type("email@gmail.com").blur();
    cy.get('@password').type("password123"). blur();
    cy.get('@confirmPassword').type("password123").blur();
    cy.get('@signup').click()
    .wait(1000)
    .then(() => {
      cy.location().should((loc) => {
        const location = loc;
        expect(location.pathname).to.equal("/signup");
      });
    });

    cy.visit('/signup')

    cy.get('input[id="username"]').as('username');
    cy.get('input[id="firstName"]').as('firstName');
    cy.get('input[id="lastName"]').as('lastName');
    cy.get('input[id="password"]').as('password');
    cy.get('input[id="confirmPassword"]').as('confirmPassword');
    cy.get('Button[id="signup"]').as('signup');

    cy.get('@username').type("username").blur();
    cy.get('@firstName').type("Evan").blur();
    cy.get('@lastName').type("Brewer").blur();
    cy.get('@password').type("password123"). blur();
    cy.get('@confirmPassword').type("password123").blur();
    cy.get('@signup').click()
    .wait(1000)
    .then(() => {
      cy.location().should((loc) => {
        const location = loc;
        expect(location.pathname).to.equal("/signup");
      });
    });

    cy.visit('/signup')

    cy.get('input[id="username"]').as('username');
    cy.get('input[id="firstName"]').as('firstName');
    cy.get('input[id="lastName"]').as('lastName');
    cy.get('input[id="email"]').as('email');
    cy.get('input[id="confirmPassword"]').as('confirmPassword');
    cy.get('Button[id="signup"]').as('signup');

    cy.get('@username').type("username").blur();
    cy.get('@firstName').type("firstName").blur();
    cy.get('@lastName').type("brewer").blur();
    cy.get('@email').type("email@gmail.com"). blur();
    cy.get('@confirmPassword').type("password123").blur();
    cy.get('@signup').click()
    .wait(1000)
    .then(() => {
      cy.location().should((loc) => {
        const location = loc;
        expect(location.pathname).to.equal("/signup");
      });
    });

    cy.visit('/signup')

    cy.get('input[id="username"]').as('username');
    cy.get('input[id="firstName"]').as('firstName');
    cy.get('input[id="lastName"]').as('lastName');
    cy.get('input[id="email"]').as('email');
    cy.get('input[id="password"]').as('password');
    cy.get('Button[id="signup"]').as('signup');

    cy.get('@username').type("username").blur();
    cy.get('@firstName').type("Evan").blur();
    cy.get('@lastName').type("Brewer").blur();
    cy.get('@email').type("email@gmail.com"). blur();
    cy.get('@password').type("password123").blur();
    cy.get('@signup').click()
    .wait(1000)
    .then(() => {
      cy.location().should((loc) => {
        const location = loc;
        expect(location.pathname).to.equal("/signup");
      });
    });
  });
})
