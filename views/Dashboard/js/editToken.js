// Function to hide alert messages
const hideAlert = () => {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
};

// Function to show alert messages
const showAlert = (type, msg) => {
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, 5000);
};

// Function to fetch dashboard_data
const fetchDashboardData = async () => {
    const response = await fetch('http://localhost:4001/api/v1/dashboard1');
    const objectData = await response.json();
    return objectData.data;
};

// Fetch dashboard data and create a table dynamically
const dd = await fetchDashboardData();
console.log("the dashboard data is: ", dd);

const table = document.createElement('table');
table.classList.add('table'); // Add Bootstrap table class

const tableHeader = document.createElement('thead');
const headerRow = document.createElement('tr');
const headers = ['Sl. No', 'Date', 'Department', 'No of Tokens', 'Action', 'Action2'];

headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
});

tableHeader.appendChild(headerRow);
table.appendChild(tableHeader);

const tableBody = document.createElement('tbody');

dd.forEach((item, index) => {
    const row = document.createElement('tr');

    const slNoCell = document.createElement('td');
    slNoCell.textContent = index + 1;
    row.appendChild(slNoCell);

    const dateCell = document.createElement('td');
    dateCell.textContent = item.date;
    row.appendChild(dateCell);

    const departmentCell = document.createElement('td');
    departmentCell.textContent = item.department;
    row.appendChild(departmentCell);

    const noOfTokenCell = document.createElement('td');
    const noOfTokenInput = document.createElement('input');
    noOfTokenInput.type = 'text';
    noOfTokenInput.value = item.noOfToken;
    noOfTokenCell.appendChild(noOfTokenInput);
    row.appendChild(noOfTokenCell);

    const actionCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.type = "submit";
    editButton.id = `editing${index + 1}`
    editButton.classList.add('btn', 'btn-primary', 'editing');
    editButton.addEventListener('click', (event) => handleEditClick(event, item, noOfTokenInput));
    actionCell.appendChild(editButton);
    row.appendChild(actionCell);

    // Action2 column with Delete button
    const action2Cell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.type = "button"; // Change to "button" type to prevent form submission
    deleteButton.id = `deleting${index + 1}`
    deleteButton.classList.add('btn', 'btn-danger', 'deleting');
    deleteButton.addEventListener('click', () => handleDeleteClick(index));
    action2Cell.appendChild(deleteButton);
    row.appendChild(action2Cell);

    tableBody.appendChild(row);
});

table.appendChild(tableBody);

const tableEditDiv = document.getElementById('table_edit');
tableEditDiv.appendChild(table);

// Event Listener for "Edit" button clicks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('editing')) {
        const index = parseInt(e.target.id.replace('editing', ''), 10);
        handleEditClick(index);
    }
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('deleting')) {
        const index = parseInt(e.target.id.replace('deleting', ''), 10);
        // console.log("now dd is",dd[index-1]);
        handleDeleteClick(index);
    }
});

const handleEditClick = (index) => {
    showAlert('info', `Edit button clicked with index: ${index}`);
    console.log("item inside handleEdit", dd[index - 1]);
    const departmentId = dd[index - 1]._id;
    const date = dd[index - 1].date;
    const department = dd[index - 1].department;

    // Retrieve the updated noOfToken value from the input field
    const noOfTokenInput = document.getElementById(`editing${index}`).parentNode.parentNode.querySelector('input[type="text"]');
    const noOfToken = noOfTokenInput.value;

    updatetokenno(departmentId, date, department, noOfToken);
    // You can now use 'item' within this function
};


const updatetokenno = async (departmentId, date, department, noOfToken) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `http://localhost:4001/api/v1/dashboard1/${departmentId}`,
            data: {
                date,
                department,
                noOfToken
            }
        });
        if (res.data.status === 'success') {
            console.log("Successful");
            showAlert("success", "Token updated successfully");

            // Refresh the page after a short delay (e.g., 1000 milliseconds or 1 second)
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    } catch (err) {
        showAlert("error", "Product updated failed");
    }
};

const handleDeleteClick = (index) => {
    showAlert('info', `Delete button clicked with index: ${index}`);
    const departmentId = dd[index]._id;
    deleteItem(departmentId);
};

const deleteItem = async (departmentId) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `http://localhost:4001/api/v1/dashboard1/${departmentId}`
        });
        if (res.data.status === 'success') {
            console.log("Successful");
            showAlert("success", "Item deleted successfully");

            // Reload the page after a short delay (e.g., 1000 milliseconds or 1 second)
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    } catch (err) {
        showAlert("error", "Item deletion failed");
    }
};


