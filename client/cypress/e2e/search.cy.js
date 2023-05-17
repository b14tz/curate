import { cyan } from "@mui/material/colors";
import { internal_processStyles } from "@mui/styled-engine";

context("Search", () => {

    beforeEach(() => {
        cy.visit('/discover');
    });

    it('create searchable user', () => {
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
    cy.get('@email').type("search@gmail.com").blur();
    cy.get('@password').type("password123").blur();
    cy.get('@confirmPassword').type("password123").blur();

    cy.get('@signup').click().wait(1000);
    });

    it('should not search if there is nothing entered in the search bar', () => {
        cy.get('input[id=search-bar]').as('sb');
        cy.get('@sb').type('{enter}').wait(1000).blur()
        .then(() => {
            cy.location().should((loc) => {
                const location = loc;
                expect(location.pathname).to.equal("/discover");
              });
        });
    });

    it('should search if the search bar is populated and enter if pressed', () => {
        cy.get('input[id=search-bar]').as('sb');
        cy.get('@sb').type('test search').blur().wait(1000);
        cy.get('@sb').type('{enter}')
        .then(() => {
            cy.location().should((loc) => {
                const location = loc;
                expect(location.pathname).to.equal("/search/test%20search");
              });
        });
    });

    it('should update the search term on the search results page', () => {
        cy.get('input[id=search-bar]').as('sb');
        cy.get('@sb').type('test search').blur().wait(1000);
        cy.get('@sb').type('{enter}');

        cy.get('span[id="search-term"]').as('st');
        cy.get('@st').should(
            "have.text",
            'Search Results For "test search"'
        )

        cy.get('@st').should.no
    });

    // playlist searching 

    // user searching

    it('should see the user when filtering for all', () => {
        cy.visit('/')
    });

    it('should see the user when filtering for users', () => {

    });

    it('should not see the user when filtering for lists', () => {

    });

    it('should not see the user when filtering for songs', () => {

    });

    it('should not see the user when filtering for albums', () => {

    });

    it('should not see the user when filtering for artists', () => {

    });

    it('should not see the user when filtering for tags', () => {

    });

    // song searching
    it('should see Anti-Hero by Taylor Swift when searching for it', () => {
        cy.get('input[id=search-bar]').as('sb');
        cy.get('@sb').type('Anti-Hero').blur().wait(1000);
        cy.get('@sb').type('{enter}');
        
        cy.get('Button[id="filter-songs"]').as('filter')
        cy.get('@filter').click().blur().wait(20000);

    }); 
    // album searching
    it('should see Back in Black when searching for albums', () => {
        cy.get('input[id=search-bar]').as('sb');
        cy.get('@sb').type('Back in Black').wait(1000);
        cy.get('@sb').type('{enter}');
        
        cy.get('Button[id="filter-albums"]').as('filter')
        cy.get('@filter').click().blur().wait(20000);

    }); 
    // artist searching
    it('should see Taylor Swift when searching for artists', () => {
        cy.get('input[id=search-bar]').as('sb');
        cy.get('@sb').type('Taylor Swift').wait(1000);
        cy.get('@sb').type('{enter}');
        
        cy.get('Button[id="filter-artists"]').as('filter')
        cy.get('@filter').click().blur().wait(20000);

    }); 

    // tag searching

});