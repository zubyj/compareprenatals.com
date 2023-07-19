let jsonData = [];  // We will load our JSON data into this variable
let sortDirection = true;  // Keep track of the direction of sorting
let visibleHeaders = [];  // Keep track of the headers that are currently visible
let fdaData = {};  // We will load our FDA RDV data into this variable

// Load the JSON data
Promise.all([
    fetch('prenatal-vitamins.json').then(response => response.json()),
    fetch('fda-rdv.json').then(response => response.json()),
]).then(([vitaminData, fdaRdvData]) => {
    jsonData = vitaminData;
    fdaData = fdaRdvData;
    visibleHeaders = Object.keys(jsonData[0].general_info).concat(jsonData[0].vitamins.map(v => v.name));
    populateTable();
});

let headerMapping = {
    "pill_type": "Type",
    "brand": "Brand",
    "price": "Price",
    "serving_size": "Serving Size",
    "added_sugar": "Added Sugar",
    "url": "Website"
};

function extractFirstWordFromUrl(url) {
    let urlObject = new URL(url);
    let hostParts = urlObject.hostname.split('.');
    return hostParts.length > 1 ? hostParts[1].charAt(0).toUpperCase() + hostParts[1].slice(1) : hostParts[0];
}

function populateTable() {
    let table = document.getElementById('vitaminTable');
    table.innerHTML = '';
    let headerRow = document.createElement('tr');

    visibleHeaders.forEach(header => {
        let th = document.createElement('th');
        let mappedHeader = headerMapping[header] ? headerMapping[header] : header;
        th.textContent = mappedHeader;
        th.onclick = function () { sortTable(header); };
        headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    jsonData.forEach(item => {
        let row = document.createElement('tr');
        visibleHeaders.forEach(header => {
            let td = document.createElement('td');
            if (header in item.general_info) {
                if (header === 'url') {
                    let anchor = document.createElement('a');
                    anchor.href = item.general_info.url;
                    anchor.textContent = extractFirstWordFromUrl(item.general_info.url);
                    td.appendChild(anchor);
                } else if (Array.isArray(item.general_info[header])) {
                    td.textContent = item.general_info[header].join('/');
                } else {
                    td.textContent = item.general_info[header] ? item.general_info[header] : '-';
                }
            } else {
                let vitamin = item.vitamins.find(v => v.name == header);
                td.textContent = vitamin ? vitamin.amount : '-';
            }
            if (fdaData[header] && td.textContent != '-' && parseFloat(td.textContent) < fdaData[header]) {
                td.className = 'low';
            }
            if (td.textContent == '0') {
                td.className = 'zero';
            }
            row.appendChild(td);
        });
        table.appendChild(row);
    });
}

function sortTable(header) {
    jsonData.sort((a, b) => {
        let aValue, bValue;
        if (header in a.general_info) {
            aValue = a.general_info[header];
            bValue = b.general_info[header];
        } else if (header == 'url') {
            aValue = extractFirstWordFromUrl(a.url);
            bValue = extractFirstWordFromUrl(b.url);
        } else {
            aValue = a.vitamins.find(v => v.name == header)?.amount;
            bValue = b.vitamins.find(v => v.name == header)?.amount;
        }
        // Handle null or undefined values
        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return sortDirection ? -1 : 1;
        if (bValue == null) return sortDirection ? 1 : -1;

        // Perform the actual comparison
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortDirection ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else {
            return sortDirection ? aValue - bValue : bValue - aValue;
        }
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



/*!
* Start Bootstrap - New Age v6.0.7 (https://startbootstrap.com/theme/new-age)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-new-age/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


