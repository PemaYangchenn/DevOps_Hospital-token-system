const hideAlert = () => {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
};

const showAlert = (type, msg) => {
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, 5000);
};

const getusers = await axios({
    method: "GET",
    url: "http://localhost:4001/api/v1/users"
});

const allusers = getusers.data.data;
const users = allusers.filter(user => user.role === 'user');

let usercount = 0;

users.forEach(user => {
    const table = document.getElementById("myTable");
    const row = document.getElementById("myTableBody").insertRow();
    const td = [];
    
    for (let i = 0; i < table.rows[0].cells.length; i++) {
        td[i] = row.insertCell(i);
    }

    usercount += 1;
    const stat = user.__v === 0 ? "active" : "inactive";
    const act = user.__v === 0 ? "red" : "green";
    const cls = user.__v === 0 ? "deactivate" : "activate";

    td[0].innerHTML = user._id;
    td[1].innerHTML = user.name;
    td[2].innerHTML = user.email;
    td[3].innerHTML = user.cidNumber;
    td[4].innerHTML = `<span class="status ${stat}">${stat.charAt(0).toUpperCase() + stat.slice(1)}</span>`;
    td[5].innerHTML = `<button class="whit ${cls}" data-id="${user._id}"><ion-icon name="power"></ion-icon></button>`;
    td[5].firstChild.style.backgroundColor = act;
});

document.querySelectorAll(".deactivate").forEach(el => el.addEventListener("click", confirmDeactivate));
document.querySelectorAll(".activate").forEach(el => el.addEventListener("click", confirmActivate));

function confirmDeactivate(e) {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to deactivate this user?");
    if (confirmed) {
        const row = e.target.parentElement.parentElement.parentElement;
        const id = row.firstChild.innerHTML;
        deactivateUser(id);
    }
}

function confirmActivate(e) {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to activate this user?");
    if (confirmed) {
        const row = e.target.parentElement.parentElement.parentElement;
        const id = row.firstChild.innerHTML;
        activateUser(id);
    }
}

export const deactivateUser = async (id) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `http://localhost:4001/api/v1/users/deactivate/${id}`,
            data: {
                __v: 1
            }
        });
        if (res.data.status === 'success') {
            showAlert('success', 'User Deactivated!');
            window.setTimeout(() => {
                location.reload(true);
            }, 1000);
        }
    } catch (err) {
        let message =
            typeof err.response !== 'undefined'
                ? err.response.data.message
                : err.message;
        showAlert('error', message);
    }
};

export const activateUser = async (id) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `http://localhost:4001/api/v1/users/deactivate/${id}`,
            data: {
                __v: 0
            }
        });
        if (res.data.status === 'success') {
            showAlert('success', 'User Activated!');
            window.setTimeout(() => {
                location.reload(true);
            }, 1000);
        }
    } catch (err) {
        let message =
            typeof err.response !== 'undefined'
                ? err.response.data.message
                : err.message;
        showAlert('error', message);
    }
};
