import { showAlert } from './alert.js'
var obj = JSON.parse(document.cookie.substring(6))

var el = document.querySelector('.admin-nav')
if (obj.role == 'admin') {
    el.innerHTML =
        '<h5 class="admin-nav__heading">Admin</h5><ul class="side-nav"><a href="#"><svg><use xlink:href="img/icons.svg#icon-users"></use> </svg>Manage users</a></li> <li><a href="#"><svg><use xlink:href="img/icons.svg#icon-star"></use></svg>Manage News</a></li><li><a href="#"><svg><use xlink:href="img/icons.svg#icon-briefcase"></use></svg>Manage E-Services</a></li></ul>'
} else if (obj.role == 'sme') {
    el.innerHTML =
        '<h5 class="admin-nav__heading">Subject Matter Expert</h5><ul class="side-nav"><li><a href="#"><svg><use xlink:href="img/icons.svg#icon-star"></use></svg>Manage News</a></li></ul>'
} else if (obj.role == 'pharmacist') {
    el.innerHTML =
        '<h5 class="admin-nav__heading">Pharmacist</h5><ul class="side-nav"><li><a href="#"><svg><use xlink:href="img/icons.svg#icon-star"></use></svg>Manage E-Services</a></li></ul>'
} else {
    el.innerHTML =
        '<h5 class="admin-nav__heading">User</h5><ul class="side-nav"><a href="#"><svg><use xlink:href="img/icons.svg#icon-users"></use> </svg>Manage Medical Reminder</a></li> <li><a href="#"><svg><use xlink:href="img/icons.svg#icon-briefcase"></use></svg>Manage E-Services</a></li></ul>'
}


var el1 = document.querySelector('.form.form-user-data')
el1.innerHTML =
    ` <div class="form__group"> 
  <label class="form__label" for="name">Name</label> 
  <input class="form__input" id="name" type="text" value="` +
    obj.name.toUpperCase() +
    `" required="required" name="name"/>
  </div>
  <div class="form__group ma-bt-md">
  <label class="form__label" for="CID">CID</label>
    <input class="form__input" id="CID" type="number" value="` +
    obj.cid + ``
        `" required="required" name="CID"/>
</div>
<div class="form__group ma-bt-md">
  <label class="form__label" for="PhoneNo">Phone Number</label>
    <input class="form__input" id="PhoneNo" type="number" value="` +
    obj.phoneNo + ``
        `" required="required" name="email"/>
</div>
  <div class="form__group ma-bt-md">
  <label class="form__label" for="email">Email address</label>
    <input class="form__input" id="email" type="email" value="` +
    obj.email + ``
        `" required="required" name="email"/>
</div>
<button class="btn btn--small btn--green">Save settings</button></div>`


//Updating settings

// type is either 'password' or data
export const updateSettings = async (data, type) => {
    try {
        const url =
            type === 'password'
                ? 'http://localhost:4001/api/v1/users/updateMyPassword'
                : 'http://localhost:4001/api/v1/users/updateMe'
        const res = await axios({
            method: 'PATCH',
            url,
            data,
        })
        console.log(res.data.status)
        if (res.data.status === 'success') {
            showAlert('success', 'Data updated successfully!')
        }
    } catch (err) {
        let message =
            typeof err.response !== 'undefined'
                ? err.response.data.message
                : err.message
        // showAlert('error',err.message ,message)
        showAlert('error', err.response.data.message)
    }
}

const userDataForm = document.querySelector('.form.form-user-data')
userDataForm.addEventListener('submit', (e) => {
    e.preventDefault()
    var obj = JSON.parse(document.cookie.substring(6))

    const form = new FormData()
    form.append('name', document.getElementById('name').value)
    form.append('CID', document.getElementById('CID').value)
    form.append('PhoneNo', document.getElementById('phoneNo').value)
    form.append('email', document.getElementById('email').value)
    form.append('userId', obj._id)
    console.log(form)
    updateSettings(form, 'data')
})