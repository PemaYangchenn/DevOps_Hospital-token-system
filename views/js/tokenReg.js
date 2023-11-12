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
        console.log("i am inside");
        const res = await axios({
            method:"POST",
            url:"http://localhost:4001/api/v1/tokens/Ctoken",
            data:{
                date,
                departmentR,
                username,
                cid,
                phoneno
            }
        });
        console.log(res.data);
        if(res.data.status === "success"){
            showAlert("success", `SUCCESS: token registered successfully!${departmentR}`)

            window.setTimeout(() => {
                location.assign("/home3")
            }, 1500)
        }
    } catch (err){
        console.log("i am outside");
        console.log(err);
        let message = typeof err.response !== 'undefined' ? err.response.data.message: err.message
        showAlert('error', 'ERROR: incorrect registration', message)
    }
}

document.getElementById("token-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const datev = document.getElementById("date").value;
    const sickness = document.getElementById('sickness').value;

    var cookie = document.cookie.split("token=")[1];
    var User = JSON.parse(cookie.split(';')[0]);

    var username = User.name;
    var cid = User.cidNumber;
    var phoneno = User.contactNumber;

    const datevalue = datev.trim()
    const sicknessvalue = sickness.trim()
    const usernamevalue = username.trim()
    const cidvalue = cid.trim()
   
    console.log(typeof(phoneno));
   tokenregister(datevalue, sicknessvalue, usernamevalue, cidvalue,phoneno)
});


