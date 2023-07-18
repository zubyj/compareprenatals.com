let jsonData = [];  // We will load our JSON data into this variable
let sortDirection = true;  // Keep track of the direction of sorting
let visibleHeaders = [];  // Keep track of the headers that are currently visible

// Load the JSON data
fetch('prenatal-vitamins.json')
    .then(response => response.json())
    .then(data => {
        jsonData = data;
        visibleHeaders = Object.keys(jsonData[0].general_info).concat(jsonData[0].vitamins.map(v => v.name)).concat(['url']);
        populateTable();
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
            if (header in item.general_info) {
                td.textContent = item.general_info[header] ? item.general_info[header] : '-';
            } else if (header == 'url') {
                td.textContent = item.url;
            } else {
                let vitamin = item.vitamins.find(v => v.name == header);
                td.textContent = vitamin ? vitamin.amount : '-';
            }
            if (td.textContent == '0') {
                td.className = 'zero';
            }
            row.appendChild(td);
        });
        table.appendChild(row);
    });
}

// Function to sort the table
function sortTable(header) {
    jsonData.sort((a, b) => {
        let aValue = header in a.general_info ? a.general_info[header] : (header == 'url' ? a.url : a.vitamins.find(v => v.name == header).amount);
        let bValue = header in b.general_info ? b.general_info[header] : (header == 'url' ? b.url : b.vitamins.find(v => v.name == header).amount);
        if (aValue < bValue) return sortDirection ? -1 : 1;
        if (aValue > bValue) return sortDirection ? 1 : -1;
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
