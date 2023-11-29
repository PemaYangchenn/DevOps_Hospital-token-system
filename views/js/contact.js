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

const username1 = document.getElementById("name");
const email1 = document.getElementById("email");
const subject1 = document.getElementById("subject");
const Message1 = document.getElementById("message");


const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector("small");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector("small");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const username1validate = (username1) => {
  const re = /^[A-Za-z]+(?: [A-Za-z]+)?$/;
  return re.test(username1);
};

const isemail1Valid = (email1) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email1);
};

const subject1validate = (subject1) => {
  const re = /^[A-Za-z]+(?: [A-Za-z]+)?$/;
  return re.test(subject1);
};


const message1validate = (subject1) => {
  const re = /^[A-Za-z0-9.,\s]+$/;
  return re.test(Message1);
};

const contact = async (
    name, 
    email,
    subject,
    message,
) => {
    try{
        const res = await axios({
            method:"POST",
            url: "http://localhost:4001/api/v1/contact",
            data: {
                email,
                name,
                subject,
                message
            }
        });
        console.log(res.data);
        if(res.data.status === "success"){
            showAlert("success", "Feedback send succcessfully!")
            window.setTimeout(() => {
                location.assign("/home2");
            }, 1500)
        }
    } catch (err) {
        let message;
        if(err.response && err.response.data && err.response.data.message){
            message = err.response.data.message;
        } else {
            message = err.message || "Something went Wrong!"
        }
        showAlert("error", message)
    }
}

document.querySelector("#contact_form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const Message = document.getElementById("message").value;

    validateInputs();
    contact(name, email, subject, Message)
});

const validateInputs = () => {
  const username1value = username1.value.trim();
  const email1value = email1.value.trim();
  const subjectvalue = subject1.value.trim();
  const messagevalue= Message1.value.trim();

  if (username1value === "") {
    setError(username1, "username1 cannot be blank");
    // return false;
  } else if (!(username1value.length >= 3 && username1value.length <= 25)) {
    setError(username1, "length of usename should be inbetween 3 and 25");
    // return false;
  } else if (!username1validate(username1value)) {
    setError(username1, "usename should be only alphabate");
    // return false;
  } else {
    setSuccess(username1);
  }


  if (email1value === "") {
    setError(email1, "email1 cannot be blank");
    // return false;
  } else if (!isemail1Valid(email1value)) {
    setError(email1, "email1 is not in proper formate");
    // return false;
  } else {
    setSuccess(email1);
  }

  if (subjectvalue === "") {
    setError(subject1, "subject cannot be empty");
    // return false;
  } else if (!subject1validate(subject1)) {
    setError(
      subject1,
      "subject cannot be error"
    );
    // return false;
  }
  else{
    setSuccess(subject1)
  }

  if (messagevalue === "") {
    setError(Message1, "Message  cannot be empty");
    // return false;
  } else if (!message1validate(messagevalue)) {
    setError(
      Message1,
      "Message should be alphabate numberic"
    );
    // return false;
  }
  else{
    setSuccess(Message1)
  }

  // return true;
};
