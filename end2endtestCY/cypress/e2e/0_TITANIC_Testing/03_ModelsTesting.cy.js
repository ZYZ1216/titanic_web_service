describe('Test for each Model see if each works well', () => {
  const modelCheckboxes = [
    '#randomForest',
    '#Decision',
    '#KNN',
    '#Support',
    '#Logistic',
    '#gaussian',
    '#perceptron',
    '#linear_svc',
    '#sgd'
  ];

  const result =  [
      'Random Forest',
      'Decision Tree',
      'k-Nearest Neighbors',
      'Support Vector Machine',
      'Logistic Regression',
      'Gaussian',
      'Perceptron',
      'Linear SVC',
      'Stochastic Gradient Descent'


  ];

  for (let i = 0; i < modelCheckboxes.length; i++) {

    it(`Models Testing ${modelCheckboxes[i]}`, () => {
      // cy.visit('/landing-index.html')
      // cy.contains('To Survival Calculater').click()
      cy.visit('/survival_calculator.html', { failOnStatusCode: false })
        .then((response) => {
          if (response.status === 200) {
            cy.contains('To Survival Calculater').click();
            cy.url().should('include', 'survival_calculator.html');
          } else {
            // if 404 try  http://localhost:8088/survival_calculator.html
            cy.wrap(null).then(() => {
              cy.visit('http://localhost:8088/survival_calculator.html');
            });
          }
        });


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
        cy.wait(200);
        cy.get('#PClass').should('have.value', selectedOption);
      });
        cy.wait(200);
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
      cy.wait(200);
      const randomAge = Math.floor(Math.random() * 100);
      const randomFare = Math.floor(Math.random() * 500);
      const genders = ['male', 'female'];
      const randomGender = genders[Math.floor(Math.random() * genders.length)];
      const randomSiblings = Math.floor(Math.random() * 100);
      const randomParents = Math.floor(Math.random() * 2);

      cy.get('#Pname').type('Jack')
      cy.wait(200);
      cy.get('#age').type(randomAge.toString())
      cy.wait(200);
      cy.get('#fare').type(randomFare.toString())
      cy.wait(200);
      cy.get(`#${randomGender}`).check();
      cy.wait(200);
      cy.get('#siblings').type(randomSiblings.toString())
      cy.wait(200);
      cy.get('#parents').type(randomParents.toString())
      cy.wait(200);
      cy.get(modelCheckboxes[i]).check({ force: true }).should('be.checked');
      cy.wait(200);
      cy.contains('Predict').click()
      cy.wait(200);
      cy.get('#resultsContainer').within(() => {
        cy.contains('div', result[i]).should('exist');
        cy.contains('div', /survive(d)?/i).should('exist');
      });

    })//it

  }//for
});



describe('Test for selects several Models see if them works well', () => {
  const modelCheckboxes = [
    '#randomForest',
    '#Decision',
    '#KNN',
    '#Support',
    '#Logistic',
    '#gaussian',
    '#perceptron',
    '#linear_svc',
    '#sgd'
  ];

  const result =  [
      'Random Forest',
      'Decision Tree',
      'k-Nearest Neighbors',
      'Support Vector Machine',
      'Logistic Regression',
      'Gaussian',
      'Perceptron',
      'Linear SVC',
      'Stochastic Gradient Descent'
  ];

  const testRun = (runNumber) => {
    it(`Randomly selects 3 models and checks if results are displayed correctly, run #${runNumber}`, () => {
      cy.visit('/survival_calculator.html', { failOnStatusCode: false })
        .then((response) => {
          if (response.status === 200) {
            cy.contains('To Survival Calculater').click();
            cy.url().should('include', 'survival_calculator.html');
          } else {
            // if 404 try  http://localhost:8088/survival_calculator.html
            cy.wrap(null).then(() => {
              cy.visit('http://localhost:8088/survival_calculator.html');
            });
          }
        });

      // choose Title randomly
      cy.get('#title').then($select => {
        const options = $select.find('option').not(':disabled');
        const randomIndex = Math.floor(Math.random() * options.length);
        const selectedOption = options[randomIndex].value;
        cy.get('#title').select(selectedOption);
        cy.get('#title').should('have.value', selectedOption);
      });

      // Name
      cy.get('#Pname').type('Jack');

      // choose Passenger Class randomly
      cy.get('#PClass').then($select => {
        const options = $select.find('option').not(':disabled');
        const randomIndex = Math.floor(Math.random() * options.length);
        const selectedOption = options[randomIndex].value;
        cy.get('#PClass').select(selectedOption);
        cy.wait(200);
        cy.get('#PClass').should('have.value', selectedOption);
      });
      cy.wait(200);

      // choose Boarding Port randomly
      cy.get('#Embarked').then($select => {
        const options = $select.find('option').not(':disabled');
        const randomIndex = Math.floor(Math.random() * options.length);
        const selectedOption = options[randomIndex].value;
        cy.get('#Embarked').select(selectedOption);
        cy.get('#Embarked').should('have.value', selectedOption);
      });
      cy.wait(200);

      const randomAge = Math.floor(Math.random() * 100);
      const randomFare = Math.floor(Math.random() * 200);
      const genders = ['male', 'female'];
      const randomGender = genders[Math.floor(Math.random() * genders.length)];
      const randomSiblings = Math.floor(Math.random() * 5);
      const randomParents = Math.floor(Math.random() * 2);

      cy.get('#Pname').type('Jack');
      cy.wait(200);
      cy.get('#age').type(randomAge.toString());
      cy.wait(200);
      cy.get('#fare').type(randomFare.toString());
      cy.wait(200);
      cy.get(`#${randomGender}`).check();
      cy.wait(200);
      cy.get('#siblings').type(randomSiblings.toString());
      cy.wait(200);
      cy.get('#parents').type(randomParents.toString());
      cy.wait(200);

      // Randomly select 3 models
      const selectedModels = Cypress._.sampleSize(modelCheckboxes, 3);
      selectedModels.forEach(model => {
        cy.get(model).check({ force: true }).should('be.checked');
        cy.wait(200);
      });

      cy.contains('Predict').click();
      cy.wait(200);

      // Check if the results are displayed for each selected model
      selectedModels.forEach(model => {
        const modelName = result[modelCheckboxes.indexOf(model)];
        cy.contains('div', modelName).should('exist');

        cy.get('#resultsContainer').within(() => {
          cy.contains('div', modelName).should('exist');
          cy.contains('div', /survive(d)?/i).should('exist');
        });

      });

      cy.wait(200);
    });
  };

  for (let i = 1; i <= 3; i++) {
    testRun(i);
  }
});
