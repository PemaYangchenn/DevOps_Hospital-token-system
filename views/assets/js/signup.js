const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const cidE1 = document.querySelector('#cid')
const contactNoE1 = document.querySelector('#contactNo')
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirm-password');
const form = document.querySelector('#signup');

// Utility functions for validation
const isRequired = value => value.trim() !== '';
const isBetween = (length, min, max) => length >= min && length <= max;
const isLengthValid = (length, min, max) => length >= min && length <= max;
const isUsernameValid = username => {
    const re = /^[A-Za-z]+$/;
    return re.test(username);
};
const isCidValid = cid => {
    const re = /^[1-5][1-9][0-9]|[1-9][0-9]|0[0-9]|[1-1][0-9][0-9]|[2-2][0-0-4][0-9][0-9]|[3-5][0-0-9][0-9]$/;
    return re.test(cid);
};
const isContactNumberValid = contactNumber => {
    const re = /^(17|77)\d{6}$/;
    return re.test(contactNumber);
};
const isEmailValid = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
const isPasswordSecure = password => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    return re.test(password);
};

// Utility functions for showing errors and success indicators
const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');
    const error = formField.querySelector('small');
    error.style.color = 'red'; // Set error message color to red
    error.textContent = message;
};


const showSuccess = input => {
    const formField = input.parentElement;
    formField.classList.remove('error');
    formField.classList.add('success');
    const error = formField.querySelector('small');
    error.style.color = ''; // Reset error message color
    error.textContent = '';
};


// Validation functions for form fields
const checkUsername = () => {
    const username = usernameEl.value.trim();
    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
        return false;
    } else if (!isBetween(username.length, 3, 25)) {
        showError(usernameEl, 'Username must be between 3 and 25 characters.');
        return false;
    } else {
        showSuccess(usernameEl);
        return true;
    }
};

const checkCID = () =>{
    const cid = cidE1.value.trim();
    const numberAsString = cid.toString(); // Convert number to string
    const length = numberAsString.length; // Get the length of the string
    if (!isRequired(cid)) {
        showError(cidE1, 'CID Number cannot be blank.');
        return false;
    }
    else if(!isLengthValid(length,13,13)){
        showError(cidE1,'CID Number must be exactly 13 digits');
        return false;
    }
    else if(isCidValid===false){
        return false;
    }else {
        showSuccess(cidE1);
        return true;
    }
};
const checkContactNo = () =>{
    const contactNo = contactNoE1.value.trim();
    const numberAsString = contactNo.toString();
    const length = numberAsString.length;
    if (!isRequired(contactNo)) {
        showError(contactNoE1, 'Contact Number cannot be blank.');
        return false;
    }
    else if(!isLengthValid(length,8,8)){
        showError(contactNoE1,'Contact Number must be exactly 8 digits');
        return false;
    }else{
        showSuccess(contactNoE1);
        return true;
    }
}
const checkEmail = () => {
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
        return false;
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.');
        return false;
    } else {
        showSuccess(emailEl);
        return true;
    }
};

const checkPassword = () => {
    const password = passwordEl.value.trim();
    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
        return false;
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password must have at least 8 characters, including at least one lowercase character, one uppercase character, one number, and one special character.');
        return false;
    } else {
        showSuccess(passwordEl);
        return true;
    }
};
const checkConfirmPassword = () => {
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();
    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'Please enter the password again.');
        return false;
    } else if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'The passwords do not match.');
        return false;
    } else {
        showSuccess(confirmPasswordEl);
        return true;
    }
};

// Event listener for form submission
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const isUsernameValid = checkUsername();
    const isCidNoValid = checkCID();
    const isContactNumberValid = checkContactNo();
    const isEmailValid = checkEmail();
    const isPasswordValid = checkPassword();
    const isConfirmPasswordValid = checkConfirmPassword();

    const isFormValid = isUsernameValid && isCidNoValid && isContactNumberValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;

    if (isFormValid) {
        // Perform form submission or other actions
    }
});

// Debounce function for input event
const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn.apply(null, args);
        }, delay);
    };
};

// Event listener for instant feedback using debouncing
form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'cid':
            checkCID();
            break;
        case 'contactNo':
            checkContactNo();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
    }
}));