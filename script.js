// script.js

let jsonData = [];  // We will load our JSON data into this variable
let sortDirection = true;  // Keep track of the direction of sorting
let visibleHeaders = [];  // Keep track of the headers that are currently visible

// Load the JSON data
fetch('prenatal-vitamins.json')
    .then(response => response.json())
    .then(data => {
        jsonData = data;
        visibleHeaders = Object.keys(jsonData[0]).slice(0, 12);
        populateTable();
        populateCheckboxes();
    });

// Function to populate the table with data
function populateTable() {
    // Get the table element
    let table = document.getElementById('vitaminTable');

    // Clear the table
    table.innerHTML = '';

    // Add table headers
    let headerRow = document.createElement('tr');
    visibleHeaders.forEach(header => {
        let th = document.createElement('th');
        th.textContent = header;
        th.onclick = function () { sortTable(header); };
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Add table data
    jsonData.forEach(item => {
        let row = document.createElement('tr');
        visibleHeaders.forEach(header => {
            let td = document.createElement('td');
            td.textContent = item[header] ? item[header] : '-';
            row.appendChild(td);
        });
        table.appendChild(row);
    });
}

// Function to populate the checkboxes
function populateCheckboxes() {
    let headers = Object.keys(jsonData[0]);
    let checkboxesDiv = document.getElementById('checkboxes');
    headers.slice(12).forEach(header => {
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = header;
        checkbox.onchange = function () { toggleHeader(header); };
        checkboxesDiv.appendChild(checkbox);

        let label = document.createElement('label');
        label.for = header;
        label.textContent = header;
        checkboxesDiv.appendChild(label);

        checkboxesDiv.appendChild(document.createElement('br'));
    });
}

// Function to show or hide a header
function toggleHeader(header) {
    let checkbox = document.getElementById(header);
    if (checkbox.checked) {
        visibleHeaders.push(header);
    } else {
        visibleHeaders = visibleHeaders.filter(h => h !== header);
    }
    populateTable();
}

// Rest of the code...


// Function to sort the table
function sortTable(header) {
    jsonData.sort((a, b) => {
        if (a[header] < b[header]) return sortDirection ? -1 : 1;
        if (a[header] > b[header]) return sortDirection ? 1 : -1;
        return 0;
    });

    // Reverse the direction for the next sort
    sortDirection = !sortDirection;

    // Clear the table and repopulate it with the sorted data
    document.getElementById('vitaminTable').innerHTML = '';
    populateTable();
}

// Function to filter the table
function filterTable() {
    let input = document.getElementById('searchBar');
    let filter = input.value.toUpperCase();
    let table = document.getElementById('vitaminTable');
    let tr = table.getElementsByTagName('tr');

    for (let i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td');
        for (let j = 0; j < td.length; j++) {
            if (td[j]) {
                let txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = '';
                    break;
                } else {
                    tr[i].style.display = 'none';
                }
            }
        }
    }
}
