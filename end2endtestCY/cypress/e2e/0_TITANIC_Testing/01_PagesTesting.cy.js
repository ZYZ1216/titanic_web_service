describe('Page Testing Shifting Test', () => {
  beforeEach(() => {
    cy.visit('/landing-index.html', { failOnStatusCode: false, timeout: 60000 })
      .then((response) => {
        if (response.status === 200) {
          cy.contains('To Survival Calculater', { timeout: 20000 }).click();
          cy.url().should('include', 'survival_calculator.html');
        } else {
          cy.visit('http://localhost:8088/landing-index.html', { timeout: 30000 });
          cy.contains('To Survival Calculater', { timeout: 20000 }).click();
          cy.url().should('include', 'survival_calculator.html');
        }
      });
  });


  it('Successfully open the landing page', () => {
    cy.title().should('include', 'Titanic App')
  })

  it('Navigate to Survival Calculator page', () => {
    cy.contains('To Survival Calculater').click()
    cy.url().should('include', 'survival_calculator.html')
  })

  it('Navigate back to landing index page', () => {
    cy.contains('To Survival Calculater').click()
    cy.get('a.icon.btn.p-0').click()
    cy.url().should('include', 'landing-index.html')
  })
})

describe('Titanic App Page Load Test', () => {
  beforeEach(() => {
    cy.visit('/landing-index.html', { failOnStatusCode: false })
      .then((response) => {
        if (response.status !== 200) {
          cy.visit('http://localhost:8088/landing-index.html');
        }
      });
  });

  it('should load the page correctly', () => {
    // Check the title of the page
    cy.title().should('eq', 'Titanic App');

    // Check if the header is present
    cy.get('header#header').should('exist');

    // Check if the main heading is present and correct
    cy.get('h2.text-center.fw-bold').should('exist').contains('About TITANIC');

    // Check if the description paragraph is present and contains correct text
    cy.get('p.text-center').should('exist').contains('The RMS Titanic was a British passenger liner');

    // Check if the button to navigate to the survival calculator is present and correct
    cy.get('a.btn.btn-warning').should('exist').contains('To Survival Calculater');

    // Check if the footer is present and contains correct text
    cy.get('footer').should('exist').contains('©2024 Titanic App');

    // Check if the SVG element is present
    cy.get('svg').should('exist');
  });


});


describe('Survival Calculator Page Load Test', () => {
  beforeEach(() => {
    cy.visit('/landing-index.html', { failOnStatusCode: false })
      .then((response) => {
        if (response.status === 200) {
          cy.contains('To Survival Calculater', { timeout: 10000 }).click();
        } else {
          cy.visit('http://localhost:8088/landing-index.html');
          cy.contains('To Survival Calculater', { timeout: 10000 }).click();
        }
        cy.url().should('include', 'survival_calculator.html');
      });
  });

  it('Checks the header elements', () => {
    // Check the header logo
    cy.get('header a.icon').should('be.visible');
    cy.get('header h1').should('have.text', 'Survival Calculater');
    cy.get('header button').should('be.visible');
  });

  it('Checks the form elements', () => {
    // Check form inputs and labels
    cy.get('#title').should('be.visible');
    cy.get('#Pname').should('be.visible');
    cy.get('#PClass').should('be.visible');
    cy.get('#Embarked').should('be.visible');
    cy.get('#age').should('be.visible');
    cy.get('#fare').should('be.visible');
    cy.get('#sex').should('be.visible');
    cy.get('#siblings').should('be.visible');
    cy.get('#parents').should('be.visible');
    cy.get('#models').should('be.visible');

    cy.scrollTo('bottom');
    cy.wait(500);
    // Check form buttons
    cy.get('button#resetButton').should('be.visible');
    cy.get('form button[type="submit"]').should('be.visible');
  });

  it('Checks the footer', () => {
    cy.get('footer p').should('have.text', '©2024 Titanic App');
  });

  // Check the history window
  it('Checks the History window', () => {
        cy.get('header button').click();
        cy.get('.modal-content').should('be.visible');
        const maxClicks = 500;
        cy.get('.btn-close').then($btn => {
            const btnOffset = $btn.offset();
            const btnWidth = $btn.width();
            const btnHeight = $btn.height();
            let clickCount = 0;
            function clickAndCheck(x, y) {
                if (clickCount < maxClicks) {
                    clickCount++;
                    cy.get('.btn-close').click(x, y,{ force: true });
                    cy.get('.modal-content').then($modal => {
                        if ($modal.is(':visible')) {
                            const nextX = (x + 5) % btnWidth;
                            const nextY = (x + 5) >= btnWidth ? (y + 5) % btnHeight : y;
                            clickAndCheck(nextX, nextY);
                        } else {
                            cy.log('Modal is closed');
                        }
                    });
                } else {
                    cy.log('Reached max click limit');
                }
            }
            clickAndCheck(btnOffset.left, btnOffset.top);
        });
        cy.get('.modal-content').should('not.be.visible');
    });




});




