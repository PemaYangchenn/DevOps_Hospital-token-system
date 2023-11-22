export const hideAlert = () => {
    const el = document.querySelector('.alert')
    if (el) el.parentElement.removeChild(el)
}

export const showAlert = (type, msg) => {
    hideAlert()
    const markup = `<div class="alert alert--${type}">${msg}</div>`
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup)
    window.setTimeout(hideAlert, 5000)
};

const tokenregister = async(date, departmentR, username, cid, phoneno)=>{
    try{
        const res = await axios({
            method:"POST",
            url:"http://localhost:4001/api/v1/tokens/register-token",
            data:{
                date,
                departmentR,
                username,
                cid,
                phoneno,
            }
        });
        if (res.data.status === "success") {
            showAlert("success", `Token registered successfully!${departmentR}`);
            window.setTimeout(() => {
                location.assign("/home");
            }, 1500);
        }
        
    } catch (err){
        console.log(err);
        let message = typeof err.response !== 'undefined' ? err.response.data.message: err.message
        showAlert('error', 'ERROR: incorrect registration', message)
    }
}

document.getElementById("register-token").addEventListener("submit", (e) => {
    e.preventDefault();
    const date = document.getElementById("t-date").value;
    const sickness = document.getElementById('t-department').value;
    var cookie = document.cookie.split("token=")[1];
    console.log("Cookie:", cookie);

    var userPart = cookie.split(';')[0];
    console.log("User part:", userPart);
    var User = JSON.parse(userPart);
    var username = User.name;
    var cid = User.cidNumber;
    var phoneno = User.contactNumber;

    const datevalue = date.trim()
    const sicknessvalue = sickness.trim()
    const usernamevalue = username.trim()
    const cidvalue = cid.trim()
   
    console.log(typeof(phoneno));
   tokenregister(datevalue, sicknessvalue, usernamevalue, cidvalue,phoneno)
});

const today = new Date().toISOString().split('T')[0];
// Calculate the maximum date (today + 7 days)
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 7);
const maxDateString = maxDate.toISOString().split('T')[0];

// Set the minimum and maximum date attributes
document.getElementById('t-date').setAttribute('min', today);
document.getElementById('t-date').setAttribute('max', maxDateString);