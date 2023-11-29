import { showAlert } from "./alert.js";

const login = async (cid, password, cid1, password1) => {
  const getusers = await axios({
    method: "GET",
    url: "http://localhost:4001/api/v1/users",
  });

  const allusers = getusers.data.data;
  const cidArray = allusers.map((user) => user.cidNumber);

  
  const users = []
  const mail = []
  allusers.forEach(user => {
    if (user.role === 'user') {
      users.push(user)
      mail.push(user.cidNumber)
    }
  })


  var c = 0
  var s;
  for (var i = 0; i < mail.length; i++) {
    if (cid1 === mail[i]) {
      c += 1
      s = i
    }
  }
  
 


  try {
    console.log(cid1);
    console.log(password1);
    if (cid1 === "10304001080" && password1 === "Doctor.@12"){
      showAlert('success', "SUCCESS: logged in successfully as doctor");
      window.setTimeout(() => {
        location.assign("/doctor1")
      }, 3000)
      document.cookie = "token = "+ JSON.stringify(obj);
    }
    else if (cid1 === "10708003666" && password1 === "Admin.@12") {
      showAlert('success', "SUCCESS: logged in as ADMIN");
      window.setTimeout(() => {
          location.assign('/editdashboard');
      }, 1000);
  }
    else{
          const res = await axios({
            method: "POST",
            url: "http://localhost:4001/api/v1/users/login",
            data: {
              cid,
              password,
            },
          });
          if (users[s]["__v"] === 1) {
            showAlert("error", "Cannot login. Your account is deactivated")
            window.setTimeout(() => {
              location.assign("/login");
            }, 1000);
          } else {
            if (res.data.status === "success") {
              showAlert("success", "SUCCESS: Logged in successfully");
              window.setTimeout(() => {
                location.assign("/home2");
              }, 1000);
              var obj = res.data.data.user;
              console.log(obj);
              console.log("Hello everybody");
              document.cookie = "token = " + JSON.stringify(obj);
          }
          }
          
    


    }
  } catch (err) {
    if (cid1 === "" || password1 == "") {
      showAlert("error", "ERROR: CID and password cannot be empty");
    } else {
      var sum = 0;
      for (let i in cidArray) {
        if (cidArray[i] === cid1) {
          sum += 1;
        }
      }
      if (sum === 0) {
        showAlert("error", "ERROR: The user does not exist");
      } else {
        let message =
          typeof err.response !== "undefined"
            ? err.response.data.message
            : err.message;
        showAlert("error", "ERROR: Incorrect password", message);
      }
    }
  }
};
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const cid = document.getElementById("your_cid").value;
  const cid1 = document.getElementById("your_cid").value.trim();
  const password = document.getElementById("your_password").value;
  const password1 = document.getElementById("your_password").value.trim();
  login(cid, password, cid1, password1);
  console.log("Data passed");
});
