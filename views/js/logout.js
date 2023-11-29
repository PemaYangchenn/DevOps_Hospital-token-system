

 const hideAlert = () => {
    const el = document.querySelector('.alert')
    if (el) el.parentElement.removeChild(el)
}

 const showAlert = (type, msg) => {
    hideAlert()
    const markup = `<div class="alert alert--${type}">${msg}</div>`
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup)
    window.setTimeout(hideAlert, 5000)
}
// var obj
// if (document.cookie) {
//   obj = JSON.parse(document.cookie.substring(6))

// } else {
//   document.body.innerHTML =
//     "<div class='errPage'><div class='contErr'><h2>You are not logged in!!</h2></div><div><a href='/login'>Log in</a></div></div>"
// }

const logout = async () => {
  // Show a confirmation box before logging out
  const confirmBox = window.confirm("Are you sure you want to log out?");

  if (confirmBox) {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:4001/api/v1/users/logout",
      });

      if (res.data.status === "success") {
        showAlert("success", "Logged out successfully");
        window.setTimeout(() => {
          location.assign("/");
        }, 1500);
      }
    } catch (err) {
      showAlert("error", "Error logging out! Try again.");
    }
  }
};

document.getElementById("logout").addEventListener("click", (e) => logout());