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
    const response = await fetch('http://localhost:4001/api/v1/contact');
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
const headers = ['Sl. No', 'name', 'email', 'subject', 'Message', 'Action2'];

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

    const nameCell = document.createElement('td');
    nameCell.textContent = item.name;
    row.appendChild(nameCell);

    const emailCell = document.createElement('td');
    emailCell.textContent = item.email;
    row.appendChild(emailCell);

    const subjectCell = document.createElement('td');
    subjectCell.textContent = item.subject;
    row.appendChild(subjectCell);

    const messageCell = document.createElement('td');
    messageCell.textContent = item.message;
    row.appendChild(messageCell);

    // Action2 column with Delete button
    const action2Cell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.type = "button"; // Change to "button" type to prevent form submission
    deleteButton.id = `deleting${index + 1}`;
    deleteButton.classList.add('btn', 'btn-danger', 'deleting');
    deleteButton.addEventListener('click', () => handleDeleteClick(index));
    action2Cell.appendChild(deleteButton);
    row.appendChild(action2Cell);

    tableBody.appendChild(row);
});

table.appendChild(tableBody);

const tableEditDiv = document.getElementById('table_edit');
tableEditDiv.appendChild(table);
// Event Listener for "Delete" button clicks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('deleting')) {
        const index = parseInt(e.target.id.replace('deleting', ''), 10);
        // console.log("now dd is",dd[index-1]);
        handleDeleteClick(index);
    }
});

// ... (Previous code)
console.log(dd[0]._id);

const handleDeleteClick = (index) => {
        showAlert('info', `Delete button clicked with index: ${index}`);
        const feedbackId = dd[index-1]._id;
        console.log("this is the one: ",feedbackId);
        deleteItem(feedbackId);

};

// ... (Rest of the code)


const deleteItem = async (feedbackId) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `http://localhost:4001/api/v1/contact/${feedbackId}`
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
