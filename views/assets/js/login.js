import { showAlert } from "./alert.js"

const login = async (cidNumber, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:4001/api/v1/users/login',
            data: {
                cidNumber,
                password
            },
        })
        console.log(res)
        if (res.data.status == 'success') {
            showAlert('success', 'Logged in successfully')
            window.setTimeout(() => {
                location.assign('/home')
            }, 1500)
            var obj = res.data.data.user
            console.log(obj)
            document.cookie = ' token = ' + JSON.stringify(obj)
            console.log(obj)
        }
    } catch (err) {
        let message = 
            typeof err.response !== 'undefined'
            ? err.response.data.message
            :err.message
        showAlert('error', 'Error: Incorrect email or password', message)
    }
}
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.form').addEventListener('submit', (e) => {
        e.preventDefault();
        const cidNumber = document.getElementById('cidNumber').value;
        const password = document.getElementById('passwords').value;
        login(cidNumber, password);
    });
});


// document.querySelector('.form').addEventListener('submit', (e) => {
//     e.preventDefault()
//     const cid = document.getElementById('cidNumber').value
//     const password = document.getElementById('passwords').value
//     login(cid, password)
// })
