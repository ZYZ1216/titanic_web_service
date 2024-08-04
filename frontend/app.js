const modelNames = {
    0: 'Logistic Regression',
    1: 'Support Vector Machine',
    2: 'k-Nearest Neighbors',
    3: 'Gaussian',
    4: 'Perceptron',
    5: 'Linear SVC',
    6: 'Stochastic Gradient Descent',
    7: 'Decision Tree',
    8: 'Random Forest'
};

const portNames = {
    "C": "Cherbourg",
    "Q": "Queenstown",
    "S": "Southhampton"
}

const genders = {
    "male": "Male",
    "female": "Female",
}

const classes = {
    1: "First",
    2: "Second",
    3: "Third"
}

// Define the initial state
let passengers = [];
let latestResult = [];

document.addEventListener('DOMContentLoaded', (event) => {
    console.log("test1")
    // Reset the form fields
    document.getElementById('title').value = '';
    document.getElementById('Pname').value = '';
    document.getElementById('PClass').value = '';
    document.getElementById('Embarked').value = '';
    document.getElementById('age').value = '';
    document.getElementById('fare').value = '';
    var selectedRadio = document.querySelector('input[name="sex"]:checked');
        if (selectedRadio) {
        selectedRadio.checked = false;
}
    document.getElementById('siblings').value = '';
    document.getElementById('parents').value = '';
    document.querySelectorAll('#models input[type="checkbox"]:checked').forEach(el => el.checked = false);
    //******************************************************************

    document.getElementById('resetButton').addEventListener('click', function(event) {
        resetFormFields();
    });
    
    //********************************************************
    document.getElementById('passengerForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
        console.log("test2")
        // Collecting form data
        var models = Array.from(document.querySelectorAll('#models input[type="checkbox"]:checked')).map(el => parseInt(el.value, 10));

        var data = {
            "name": document.getElementById('Pname').value,
            "age": parseInt(document.getElementById('age').value, 10),
            "pclass": parseInt(document.getElementById('PClass').value, 10),
            "fare": parseFloat(document.getElementById('fare').value),
            "sibsp": parseInt(document.getElementById('siblings').value, 10),
            "parch": parseInt(document.getElementById('parents').value, 10),
            "origin": document.getElementById('Embarked').value,
            "title": document.getElementById('title').value,
            "sex": document.querySelector('input[name="sex"]:checked').value,
            "models": models 
        };

        console.log(data)

        // Create a new XMLHttpRequest object
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://127.0.0.1:8087/passenger', true);
        xhr.setRequestHeader("Content-Type", "application/json");

        // Define what happens on successful data submission
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
                console.log('Response:', json); // Log the response data
                updateUI(json); // Function to update the UI based on the response

                passengerSub(); // Call the function to update the passenger list
            }
        };

        xhr.send(JSON.stringify(data));
    });



    function passengerSub() {
        // Get the values from the form
        let title = document.getElementById('title').value;
        let Pname = document.getElementById('Pname').value;
        let PClass = parseInt(document.getElementById('PClass').value, 10);
        let Embarked = document.getElementById('Embarked').value;
        let Age = parseInt(document.getElementById('age').value, 10);
        let Fare = parseFloat(document.getElementById('fare').value);
        let Sex = document.querySelector('input[name="sex"]:checked').value;
        let siblings = parseInt(document.getElementById('siblings').value, 10);
        let parents = parseInt(document.getElementById('parents').value, 10);
        let Models = Array.from(document.querySelectorAll('#models input[type="checkbox"]:checked')).map(el => parseInt(el.value, 10));
        let result = latestResult; 

        // Push the new passenger data to the passengers array
        passengers.push([
            passengers.length + 1,
            title,
            Pname,
            classes[PClass],
            portNames[Embarked],
            Age,
            Fare,
            genders[Sex],
            siblings,
            parents,
            Models.map(index => modelNames[index]),
            result
        ]);

        updatePassengerTable();

        
    }

    function updatePassengerTable() {
        const tableBody = document.getElementById('passengerTableBody');
        const nullMessage = document.getElementById('nullMessage');
        tableBody.innerHTML = ''; // Clear previous rows

        if (passengers.length === 0) {
            nullMessage.style.display = 'block';
            return;
        } else {
            nullMessage.style.display = 'none';
        }

        passengers.slice(-10).forEach(passenger => {
            const row = document.createElement('tr');

            passenger.forEach((cellData, index) => {
                const cell = document.createElement('td');
                if (index === 0) {
                    cell.scope = 'row';
                }
                if (Array.isArray(cellData)) {
                    cellData.forEach(item => {
                        const span = document.createElement('span');
                        span.className = 'badge';
                        span.style.color = 'black';
                        span.textContent = item;
                        cell.appendChild(span);
                        cell.appendChild(document.createElement('br'));
                    });
                } else {
                    cell.textContent = cellData;
                }
                row.appendChild(cell);
            });

            tableBody.appendChild(row);
        });
    }
});

// Function to update UI based on the backend response
function updateUI(results) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = ''; // Clear previous results
    latestResult = [];
    Object.keys(results).forEach(key => {
        const modelName = modelNames[key]; // Get the model name from the mapping at the top of this page
        const result = results[key] === 1 ? 'Survived!' : 'Did not survive :(';
        latestResult.push(result);
        const modelResult = document.createElement('div');
        modelResult.textContent = `${modelName} Prediction: ${result}`; // Use model name instead of index
        resultsContainer.appendChild(modelResult);
    });
}

function resetFormFields() {
    document.getElementById('title').value = '';
    document.getElementById('Pname').value = '';    
    document.getElementById('PClass').value = '';
    document.getElementById('Embarked').value = '';
    document.getElementById('age').value = '';
    document.getElementById('fare').value = '';
    var selectedRadio = document.querySelector('input[name="sex"]:checked');
        if (selectedRadio) {
        selectedRadio.checked = false;
}
    document.getElementById('siblings').value = '';
    document.getElementById('parents').value = '';
    document.querySelectorAll('#models input[type="checkbox"]:checked').forEach(el => el.checked = false);
}


