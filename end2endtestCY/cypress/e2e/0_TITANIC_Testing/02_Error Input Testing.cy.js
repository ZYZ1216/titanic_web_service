describe('Testing with irregular inputs should get warring', () => {
  beforeEach(() => {
  // try //survival_calculator.html
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
});


  it('Should With no Prediction when not select Title', () => {
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

    // get resultsContainer
    cy.get('#resultsContainer').then($container => {
    // get old div numbers
    const initialDivCount = $container.find('div').length;

    // reget resultsContainer
    cy.get('#resultsContainer').then($updatedContainer => {
    // get current div numbers
    const updatedDivCount = $updatedContainer.find('div').length;

    expect(updatedDivCount).to.equal(initialDivCount);
  });
});
  })

  it('Should With no Prediction when not input Name', () => {
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


    //not input name
    //cy.get('#Pname').type('Jack')

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


    cy.get('#age').type(randomAge.toString())
    cy.get('#fare').type(randomFare.toString())
    cy.get(`#${randomGender}`).check();
    cy.get('#siblings').type(randomSiblings.toString())
    cy.get('#parents').type(randomParents.toString())
    cy.get('#randomForest').check({ force: true }).should('be.checked');

    cy.contains('Predict').click()

    // get resultsContainer
    cy.get('#resultsContainer').then($container => {
    // get old div numbers
    const initialDivCount = $container.find('div').length;

    // reget resultsContainer
    cy.get('#resultsContainer').then($updatedContainer => {
    // get current div numbers
    const updatedDivCount = $updatedContainer.find('div').length;

    expect(updatedDivCount).to.equal(initialDivCount);
  });
});
  })

describe('Testing irregular Passenger Name', () => {
  beforeEach(() => {
  // try //survival_calculator.html
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
});

  it('Successfully open the survival calculator', () => {
    cy.url().should('include', 'survival_calculator.html')
  })

  const name = [
      '  ',
      '@@',
      '21321',
      'JA@!#'
  ];
  for (let i = 0; i < name.length; i++){
    it(`Testing with irregular name input：${name[i]}`, () => {

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
      cy.get('#Pname').type(name[i])

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

      // get resultsContainer
      cy.get('#resultsContainer').then($container => {
      // get old div numbers
      const initialDivCount = $container.find('div').length;

      // reget resultsContainer
      cy.get('#resultsContainer').then($updatedContainer => {
      // get current div numbers
      const updatedDivCount = $updatedContainer.find('div').length;

      expect(updatedDivCount).to.equal(initialDivCount);
        });
      });
    })

  }//for


})

  it('Should With no Prediction when not select Passenger Class', () => {
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

    // not choose Passenger Class randomly
    // cy.get('#PClass').then($select => {
    //       // get all options
    //   const options = $select.find('option').not(':disabled');
    //         // choose randomly
    //   const randomIndex = Math.floor(Math.random() * options.length);
    //   const selectedOption = options[randomIndex].value;
    //         // select
    //   cy.get('#PClass').select(selectedOption);
    //
    //   cy.get('#PClass').should('have.value', selectedOption);
    // });

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

    //cy.get('#Pname').type('Jack')
    cy.get('#age').type(randomAge.toString())
    cy.get('#fare').type(randomFare.toString())
    cy.get(`#${randomGender}`).check();
    cy.get('#siblings').type(randomSiblings.toString())
    cy.get('#parents').type(randomParents.toString())
    cy.get('#randomForest').check({ force: true }).should('be.checked');

    cy.contains('Predict').click()

    // get resultsContainer
    cy.get('#resultsContainer').then($container => {
    // get old div numbers
    const initialDivCount = $container.find('div').length;

    // reget resultsContainer
    cy.get('#resultsContainer').then($updatedContainer => {
    // get current div numbers
    const updatedDivCount = $updatedContainer.find('div').length;

    expect(updatedDivCount).to.equal(initialDivCount);
  });
});
  })

  it('Should With no Prediction when not select Boarding Port', () => {
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

    //not choose Passenger Class randomly
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
    // cy.get('#Embarked').then($select => {
    //       // get all options
    //   const options = $select.find('option').not(':disabled');
    //         // choose randomly
    //   const randomIndex = Math.floor(Math.random() * options.length);
    //   const selectedOption = options[randomIndex].value;
    //         // select
    //   cy.get('#Embarked').select(selectedOption);
    //
    //   cy.get('#Embarked').should('have.value', selectedOption);
    // });

    const randomAge = Math.floor(Math.random() * 100);
    const randomFare = Math.floor(Math.random() * 500);
    const genders = ['male', 'female'];
    const randomGender = genders[Math.floor(Math.random() * genders.length)];
    const randomSiblings = Math.floor(Math.random() * 100);
    const randomParents = Math.floor(Math.random() * 2);

    //cy.get('#Pname').type('Jack')
    cy.get('#age').type(randomAge.toString())
    cy.get('#fare').type(randomFare.toString())
    cy.get(`#${randomGender}`).check();
    cy.get('#siblings').type(randomSiblings.toString())
    cy.get('#parents').type(randomParents.toString())
    cy.get('#randomForest').check({ force: true }).should('be.checked');

    cy.contains('Predict').click()

    // get resultsContainer
    cy.get('#resultsContainer').then($container => {
    // get old div numbers
    const initialDivCount = $container.find('div').length;

    // reget resultsContainer
    cy.get('#resultsContainer').then($updatedContainer => {
    // get current div numbers
    const updatedDivCount = $updatedContainer.find('div').length;

    expect(updatedDivCount).to.equal(initialDivCount);
  });
});
  })

  it('Should With no Prediction when not input Age', () => {
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

    // name
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


    //cy.get('#age').type(randomAge.toString())
    cy.get('#fare').type(randomFare.toString())
    cy.get(`#${randomGender}`).check();
    cy.get('#siblings').type(randomSiblings.toString())
    cy.get('#parents').type(randomParents.toString())
    cy.get('#randomForest').check({ force: true }).should('be.checked');

    cy.contains('Predict').click()

    // get resultsContainer
    cy.get('#resultsContainer').then($container => {
    // get old div numbers
    const initialDivCount = $container.find('div').length;

    // reget resultsContainer
    cy.get('#resultsContainer').then($updatedContainer => {
    // get current div numbers
    const updatedDivCount = $updatedContainer.find('div').length;

    expect(updatedDivCount).to.equal(initialDivCount);
  });
});
  })

  it('Should With no Prediction when input irregular Age:101', () => {
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

    // name
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

    //const randomAge = Math.floor(Math.random() * 100);
    const randomFare = Math.floor(Math.random() * 500);
    const genders = ['male', 'female'];
    const randomGender = genders[Math.floor(Math.random() * genders.length)];
    const randomSiblings = Math.floor(Math.random() * 100);
    const randomParents = Math.floor(Math.random() * 2);


    cy.get('#age').type(101)
    cy.get('#fare').type(randomFare.toString())
    cy.get(`#${randomGender}`).check();
    cy.get('#siblings').type(randomSiblings.toString())
    cy.get('#parents').type(randomParents.toString())
    cy.get('#randomForest').check({ force: true }).should('be.checked');

    cy.contains('Predict').click()

    // get resultsContainer
    cy.get('#resultsContainer').then($container => {
    // get old div numbers
    const initialDivCount = $container.find('div').length;

    // reget resultsContainer
    cy.get('#resultsContainer').then($updatedContainer => {
    // get current div numbers
    const updatedDivCount = $updatedContainer.find('div').length;

    expect(updatedDivCount).to.equal(initialDivCount);
  });
});
  })

  it('Should With no Prediction when not input Fare', () => {
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

    // name
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


    cy.get('#age').type(randomAge.toString())
    //cy.get('#fare').type(randomFare.toString())
    cy.get(`#${randomGender}`).check();
    cy.get('#siblings').type(randomSiblings.toString())
    cy.get('#parents').type(randomParents.toString())
    cy.get('#randomForest').check({ force: true }).should('be.checked');

    cy.contains('Predict').click()

    // get resultsContainer
    cy.get('#resultsContainer').then($container => {
    // get old div numbers
    const initialDivCount = $container.find('div').length;

    // reget resultsContainer
    cy.get('#resultsContainer').then($updatedContainer => {
    // get current div numbers
    const updatedDivCount = $updatedContainer.find('div').length;

    expect(updatedDivCount).to.equal(initialDivCount);
  });
});
  })

  it('Should With no Prediction when input irregular Fare：501', () => {
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

    // name
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


    cy.get('#age').type(randomAge.toString())
    cy.get('#fare').type(501)
    cy.get(`#${randomGender}`).check();
    cy.get('#siblings').type(randomSiblings.toString())
    cy.get('#parents').type(randomParents.toString())
    cy.get('#randomForest').check({ force: true }).should('be.checked');

    cy.contains('Predict').click()

    // get resultsContainer
    cy.get('#resultsContainer').then($container => {
    // get old div numbers
    const initialDivCount = $container.find('div').length;

    // reget resultsContainer
    cy.get('#resultsContainer').then($updatedContainer => {
    // get current div numbers
    const updatedDivCount = $updatedContainer.find('div').length;

    expect(updatedDivCount).to.equal(initialDivCount);
  });
});
  })

  it('Should With no Prediction when not select Gender', () => {
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

    // name
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


    cy.get('#age').type(randomAge.toString())
    cy.get('#fare').type(randomFare.toString())
    //cy.get(`#${randomGender}`).check();
    cy.get('#siblings').type(randomSiblings.toString())
    cy.get('#parents').type(randomParents.toString())
    cy.get('#randomForest').check({ force: true }).should('be.checked');

    cy.contains('Predict').click()

    // get resultsContainer
    cy.get('#resultsContainer').then($container => {
    // get old div numbers
    const initialDivCount = $container.find('div').length;

    // reget resultsContainer
    cy.get('#resultsContainer').then($updatedContainer => {
    // get current div numbers
    const updatedDivCount = $updatedContainer.find('div').length;

    expect(updatedDivCount).to.equal(initialDivCount);
  });
});
  })

  it('Should With no Prediction when not input Siblings No.', () => {
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

    // name
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


    cy.get('#age').type(randomAge.toString())
    cy.get('#fare').type(randomFare.toString())
    cy.get(`#${randomGender}`).check();
    //cy.get('#siblings').type(randomSiblings.toString())
    cy.get('#parents').type(randomParents.toString())
    cy.get('#randomForest').check({ force: true }).should('be.checked');

    cy.contains('Predict').click()

    // get resultsContainer
    cy.get('#resultsContainer').then($container => {
    // get old div numbers
    const initialDivCount = $container.find('div').length;

    // reget resultsContainer
    cy.get('#resultsContainer').then($updatedContainer => {
    // get current div numbers
    const updatedDivCount = $updatedContainer.find('div').length;

    expect(updatedDivCount).to.equal(initialDivCount);
  });
});
  })

  it('Should With no Prediction when input irregular Siblings No.：101', () => {
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

    // name
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


    cy.get('#age').type(randomAge.toString())
    cy.get('#fare').type(randomFare.toString())
    cy.get(`#${randomGender}`).check();
    cy.get('#siblings').type(101)
    cy.get('#parents').type(randomParents.toString())
    cy.get('#randomForest').check({ force: true }).should('be.checked');

    cy.contains('Predict').click()

    // get resultsContainer
    cy.get('#resultsContainer').then($container => {
    // get old div numbers
    const initialDivCount = $container.find('div').length;

    // reget resultsContainer
    cy.get('#resultsContainer').then($updatedContainer => {
    // get current div numbers
    const updatedDivCount = $updatedContainer.find('div').length;

    expect(updatedDivCount).to.equal(initialDivCount);
  });
});
  })

  it('Should With no Prediction when not input Parents No.', () => {
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

    // name
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


    cy.get('#age').type(randomAge.toString())
    cy.get('#fare').type(randomFare.toString())
    cy.get(`#${randomGender}`).check();
    cy.get('#siblings').type(randomSiblings.toString())
    //cy.get('#parents').type(randomParents.toString())
    cy.get('#randomForest').check({ force: true }).should('be.checked');

    cy.contains('Predict').click()

    // get resultsContainer
    cy.get('#resultsContainer').then($container => {
    // get old div numbers
    const initialDivCount = $container.find('div').length;

    // reget resultsContainer
    cy.get('#resultsContainer').then($updatedContainer => {
    // get current div numbers
    const updatedDivCount = $updatedContainer.find('div').length;

    expect(updatedDivCount).to.equal(initialDivCount);
  });
});
  })

  it('Should With no Prediction when input irregular Parents No.：3', () => {
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

    // name
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


    cy.get('#age').type(randomAge.toString())
    cy.get('#fare').type(randomFare.toString())
    cy.get(`#${randomGender}`).check();
    cy.get('#siblings').type(randomSiblings.toString())
    cy.get('#parents').type(3)
    cy.get('#randomForest').check({ force: true }).should('be.checked');

    cy.contains('Predict').click()

    // get resultsContainer
    cy.get('#resultsContainer').then($container => {
    // get old div numbers
    const initialDivCount = $container.find('div').length;

    // reget resultsContainer
    cy.get('#resultsContainer').then($updatedContainer => {
    // get current div numbers
    const updatedDivCount = $updatedContainer.find('div').length;

    expect(updatedDivCount).to.equal(initialDivCount);
  });
});
  })

  it('Should With no Prediction when not select Model', () => {
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

    // name
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


    cy.get('#age').type(randomAge.toString())
    cy.get('#fare').type(randomFare.toString())
    cy.get(`#${randomGender}`).check();
    cy.get('#siblings').type(randomSiblings.toString())
    cy.get('#parents').type(randomParents.toString())
    //cy.get('#randomForest').check({ force: true }).should('be.checked');

    cy.contains('Predict').click()

    // get resultsContainer
    cy.get('#resultsContainer').then($container => {
    // get old div numbers
    const initialDivCount = $container.find('div').length;

    // reget resultsContainer
    cy.get('#resultsContainer').then($updatedContainer => {
    // get current div numbers
    const updatedDivCount = $updatedContainer.find('div').length;

    expect(updatedDivCount).to.equal(initialDivCount);
  });
});
  })

})





