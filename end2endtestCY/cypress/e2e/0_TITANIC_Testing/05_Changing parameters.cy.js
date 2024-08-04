describe('A user can get prediction update after inputs change', () => {
  beforeEach(() => {
  // try /landing-index.html
  cy.visit('/landing-index.html', { failOnStatusCode: false })
    .then((response) => {
      if (response.status === 200) {
        cy.contains('To Survival Calculater').click();
        cy.url().should('include', 'survival_calculator.html');
      } else {
        // if 404 try  http://localhost:8088/landing-index.html
        cy.wrap(null).then(() => {
          cy.visit('http://localhost:8088/landing-index.html');
          cy.contains('To Survival Calculater').click();
          cy.url().should('include', 'survival_calculator.html');
        });
      }
    });
})



    it(`A user predict after only change name`, () => {
        const names = [
          'Mike',
          'Lucy',
          'Kim',
        ];
        // choose Title randomly
        cy.get('#title').then($select => {
              // get all options
          const options = $select.find('option').not(':disabled');
                // choose randomly
          const randomIndex = Math.floor(Math.random() * options.length);
          const selectedOption = options[randomIndex].value;
                // select
          cy.get('#title').select(selectedOption);

          cy.get('#title').should('have.value', selectedOption);
        });

        //Name
        cy.get('#Pname').type('Jack')

        // choose Passenger Class randomly
        cy.get('#PClass').then($select => {
              // get all options
          const options = $select.find('option').not(':disabled');
                // choose randomly
          const randomIndex = Math.floor(Math.random() * options.length);
          const selectedOption = options[randomIndex].value;
                // select
          cy.get('#PClass').select(selectedOption);

          cy.get('#PClass').should('have.value', selectedOption);
        });

        // choose Boarding Port randomly
        cy.get('#Embarked').then($select => {
              // get all options
          const options = $select.find('option').not(':disabled');
                // choose randomly
          const randomIndex = Math.floor(Math.random() * options.length);
          const selectedOption = options[randomIndex].value;
                // select
          cy.get('#Embarked').select(selectedOption);

          cy.get('#Embarked').should('have.value', selectedOption);
        });

        const randomAge = Math.floor(Math.random() * 100);
        const randomFare = Math.floor(Math.random() * 500);
        const genders = ['male', 'female'];
        const randomGender = genders[Math.floor(Math.random() * genders.length)];
        const randomSiblings = Math.floor(Math.random() * 100);
        const randomParents = Math.floor(Math.random() * 2);

        cy.get('#Pname').type('Jack')
        cy.get('#age').type(randomAge.toString())
        cy.get('#fare').type(randomFare.toString())
        cy.get(`#${randomGender}`).check();
        cy.get('#siblings').type(randomSiblings.toString())
        cy.get('#parents').type(randomParents.toString())


        cy.get('#randomForest').check({ force: true }).should('be.checked');

        cy.contains('Predict').click()

        cy.get('#resultsContainer').within(() => {
            cy.contains('div', 'Random Forest').should('exist');
            cy.contains('div', /survive(d)?/i).should('exist');
        });

      for (let i = 0; i < 3; i++) {
        cy.wait(1000);
        cy.get('#Pname').clear().type(names[i]);
        cy.wait(1000);
        cy.contains('Predict').click()
        cy.get('#resultsContainer').within(() => {
            cy.contains('div', 'Random Forest').should('exist');
            cy.contains('div', /survive(d)?/i).should('exist');
        });

      }//for

    })//it

    it(`A user predict after only change Age`, () => {
        const Age = [
          22,
          80,
          6,
        ];
        // choose Title randomly
        cy.get('#title').then($select => {
              // get all options
          const options = $select.find('option').not(':disabled');
                // choose randomly
          const randomIndex = Math.floor(Math.random() * options.length);
          const selectedOption = options[randomIndex].value;
                // select
          cy.get('#title').select(selectedOption);

          cy.get('#title').should('have.value', selectedOption);
        });

        //Name
        cy.get('#Pname').type('Jack')

        // choose Passenger Class randomly
        cy.get('#PClass').then($select => {
              // get all options
          const options = $select.find('option').not(':disabled');
                // choose randomly
          const randomIndex = Math.floor(Math.random() * options.length);
          const selectedOption = options[randomIndex].value;
                // select
          cy.get('#PClass').select(selectedOption);

          cy.get('#PClass').should('have.value', selectedOption);
        });

        // choose Boarding Port randomly
        cy.get('#Embarked').then($select => {
              // get all options
          const options = $select.find('option').not(':disabled');
                // choose randomly
          const randomIndex = Math.floor(Math.random() * options.length);
          const selectedOption = options[randomIndex].value;
                // select
          cy.get('#Embarked').select(selectedOption);

          cy.get('#Embarked').should('have.value', selectedOption);
        });

        const randomAge = Math.floor(Math.random() * 100);
        const randomFare = Math.floor(Math.random() * 500);
        const genders = ['male', 'female'];
        const randomGender = genders[Math.floor(Math.random() * genders.length)];
        const randomSiblings = Math.floor(Math.random() * 100);
        const randomParents = Math.floor(Math.random() * 2);

        cy.get('#Pname').type('Jack')
        cy.get('#age').type(randomAge.toString())
        cy.get('#fare').type(randomFare.toString())
        cy.get(`#${randomGender}`).check();
        cy.get('#siblings').type(randomSiblings.toString())
        cy.get('#parents').type(randomParents.toString())


        cy.get('#randomForest').check({ force: true }).should('be.checked');

        cy.contains('Predict').click()

        cy.get('#resultsContainer').within(() => {
            cy.contains('div', 'Random Forest').should('exist');
            cy.contains('div', /survive(d)?/i).should('exist');
        });

      for (let i = 0; i < 3; i++) {
        cy.wait(1000);
        cy.get('#age').clear().type(Age[i]);
        cy.wait(1000);
        cy.contains('Predict').click()
        cy.get('#resultsContainer').within(() => {
            cy.contains('div', 'Random Forest').should('exist');
            cy.contains('div', /survive(d)?/i).should('exist');
        });

      }//for

    })//it
});
