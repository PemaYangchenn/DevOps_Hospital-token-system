import { showAlert } from './alert.js';

// The rest of your login.js code

const login = async (cid, password) =>{
    try{
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:4001/api/v1/users/login',
            data: {
                cid,
                password,
            },
        })  
        if (res.data.status === 'success'){
            showAlert('success', 'Logged in successfully')
            window.setTimeout(() => {
                location.assign('/home2')
            }, 3000)
            var obj = res.data.data.user
            console.log(obj);
            console.log("Hello everybody");
            document.cookie = 'token = '+ JSON.stringify(obj)
            console.log(obj);
        }

    }catch (err){
        let message = typeof err.response !== 'undefined' ? err.response.data.message: err.message
        showAlert('error', 'Error: incorrect cid or password', message)
    }
}

document.getElementById("login-form").addEventListener('submit', (e) => {
    e.preventDefault()
    const cid = document.getElementById("your_cid").value
    const password = document.getElementById("your_password").value
    login(cid, password)
    console.log("datas passed")
})

