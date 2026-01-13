/*
Author: Gobi Mohanathas
File Name: signup.js
Date of Creation: December 26, 2025
Purpose: External Javascript script handling dynamic events and form validation for signup form
*/

// Global variables that store references to specific form elements in the DOM, to modify values later
let usernameInput = document.querySelector("#username");
let passwordInput = document.querySelector("#userpassword");
let firstNameInput = document.querySelector("#firstname");
let lastNameInput = document.querySelector("#lastname");
let emailInput = document.querySelector("#email");
let userTypeInput = document.querySelector("#usertype");
let signup = document.querySelector('form[name="sign-up-form"]');

/* 
Global variables that store specific error messages depending on the form element also including a blank default message
for the case of no errors present
*/
let defaultMsg = "";
let usernameErrorMsg = "✕ User name should be non-empty, unqiue, and within 50 characters long.";
let passwordErrorMsg = "✕ Password should be non-empty, and within 50 characters.";
let firstNameErrorMsg = "✕ First name should be non-empty, and within 30 characters long";
let lastNameErrorMsg = "✕ Last name should be non-empty, and within 30 characters long"
let emailErrorMsg = "✕ Email address should be non-empty, unique, and with the format xyz@xyz.xyz.";
let userTypeErrorMsg = "✕ Please select a user type."


/*
Create and append paragraph element with class of warning to each corresponding form element for displaying 
validation error messages
*/
let usernameError = document.createElement('p');
usernameError.setAttribute("class", "warning");
usernameInput.insertAdjacentElement('afterend', usernameError);

let passwordError = document.createElement('p');
passwordError.setAttribute("class", "warning");
passwordInput.insertAdjacentElement('afterend', passwordError);

let firstNameError = document.createElement('p');
firstNameError.setAttribute("class", "warning");
firstNameInput.insertAdjacentElement('afterend', firstNameError);

let lastNameError = document.createElement('p');
lastNameError.setAttribute("class", "warning");
lastNameInput.insertAdjacentElement('afterend', lastNameError);

let emailError = document.createElement('p');
emailError.setAttribute("class", "warning");
emailInput.insertAdjacentElement('afterend', emailError);

let userTypeError = document.createElement('p');
userTypeError.setAttribute("class", "warning");
userTypeInput.insertAdjacentElement('afterend', userTypeError);

/* 
Validate username function that validates whether the username has less than 50 characters and returns
a blank string (no error) or the username error message
*/
function validateUsername() {
    let username = usernameInput.value.trim();

    if(username === "" || username.length >= 50) {
        return usernameErrorMsg;
    }
    else {
        return defaultMsg;
    }
}

/* 
Validate user password function that validates whether the password has less than 50 characters and returns
a blank string (no error) or the password error message
*/
function validatePassword() {
    let password = passwordInput.value;

    if(password === "" || password.length > 50) {
        return passwordErrorMsg;
    }
    else {
        return defaultMsg;
    }
}

/* 
Validate user first name function that validates whether the first name of user has less than 30 characters and 
returns a blank string (no error) or the first name error message
*/
function validateFirstName() {
    let firstName = firstNameInput.value;

    if(firstName === "" || firstName.length > 30) {
        return firstNameErrorMsg;
    }
    else {
        return defaultMsg;
    }
}

/* 
Validate user last name function that validates whether the last name of user has less than 30 characters and 
returns a blank string (no error) or the last name error message
*/
function validateLastName() {
    let lastName = lastNameInput.value;

    if(lastName === "" || lastName.length > 30) {
        return lastNameErrorMsg;
    }
    else {
        return defaultMsg;
    }
}

/* 
Validate email function that validates whether the email has correct structure based on regex pattern and returns
a blank string (no error) or the email error message
*/
function validateEmail() {
    let email = emailInput.value;
    let regexp = /^\S+@\S+\.\S+$/;
    let error;

    if(regexp.test(email)) {
        error = defaultMsg;
    }

    else {
        error = emailErrorMsg;
    }

    return error;
}

/*
Validate user type function that validates whether an option of free or premium has been selected
and returns a blank string (no error) or the user type error message
*/
function validateUserType() {
    let userType = userTypeInput.value;

    if (userType === "free" || userType === "premium") {
        return defaultMsg;
    }
    else {
        return userTypeErrorMsg;
    }
}

/*
Main form validation function. Checks all input fields, displays appropriate error message (if applicable), applies
and removes styling for error messages, and returns whether the form is valid or not. Additionally, converts the username
to lowercase if validation passes
*/
function validate() {
    let valid = true;

    let usernameValidation = validateUsername();
    if(usernameValidation !== defaultMsg) {
        usernameError.textContent = usernameValidation;
        usernameInput.classList.add("input-error");
        valid = false;   
    }
    else {
        usernameError.textContent = defaultMsg;
        usernameInput.classList.remove("input-error");
    }

    let passwordValidation = validatePassword();
    if(passwordValidation !== defaultMsg) {
        passwordError.textContent = passwordValidation;
        passwordInput.classList.add("input-error");
        valid = false;   
    }
    else {
        passwordError.textContent = defaultMsg;
        passwordInput.classList.remove("input-error");
    }

    let firstNameValidation = validateFirstName();
    if(firstNameValidation !== defaultMsg) {
        firstNameError.textContent = firstNameValidation;
        firstNameInput.classList.add("input-error");
        valid = false;   
    }
    else {
        firstNameError.textContent = defaultMsg;
        firstNameInput.classList.remove("input-error");
    }

    let lastNameValidation = validateLastName();
    if(lastNameValidation !== defaultMsg) {
        lastNameError.textContent = lastNameValidation;
        lastNameInput.classList.add("input-error");
        valid = false;   
    }
    else {
        lastNameError.textContent = defaultMsg;
        lastNameInput.classList.remove("input-error");
    }

    let emailValidation = validateEmail();
    if(emailValidation !== defaultMsg) {
        emailError.textContent = emailValidation;
        emailInput.classList.add("input-error")
        valid = false;   
    }
    else {
        emailError.textContent = defaultMsg;
        emailInput.classList.remove("input-error")
    }

    let userTypeValidation = validateUserType();
    if(userTypeValidation !== defaultMsg){
        userTypeError.textContent = userTypeValidation;
        userTypeInput.classList.add("input-error");
        valid = false;
    }
    else {
        userTypeError.textContent = defaultMsg;
        userTypeInput.classList.remove("input-error");
    }

    return valid;
}

/*
Adding event listener to each form element of type "blur". When user moves focus away from corresponding input form
element, applies/removes error styling in real0time (validates field as soon as focus is moved away) 
*/
usernameInput.addEventListener("blur", function() {
    let result = validateUsername();
    if(result === defaultMsg) {
        usernameError.textContent = defaultMsg;
        usernameInput.classList.remove("input-error");
    }
    else {
        usernameError.textContent = result;
        usernameInput.classList.add("input-error");
    }
    });

passwordInput.addEventListener("blur", function() {
    let result = validatePassword();
    if(result === defaultMsg) {
        passwordError.textContent = defaultMsg;
        passwordInput.classList.remove("input-error");
    }
    else {
        passwordError.textContent = result;
        passwordInput.classList.add("input-error");
    }
    });

firstNameInput.addEventListener("blur", function() {
    let result = validateFirstName();
    if(result === defaultMsg) {
        firstNameError.textContent = defaultMsg;
        firstNameInput.classList.remove("input-error");
    }
    else {
        firstNameError.textContent = result;
        firstNameInput.classList.add("input-error");
    }
    });

lastNameInput.addEventListener("blur", function() {
    let result = validateLastName();
    if(result === defaultMsg) {
        lastNameError.textContent = defaultMsg;
        lastNameInput.classList.remove("input-error");
    }
    else {
        lastNameError.textContent = result;
        lastNameInput.classList.add("input-error");
    }
    });

emailInput.addEventListener("blur", function() {
    let result = validateEmail();
    if(result === defaultMsg) {
        emailError.textContent = defaultMsg;
        emailInput.classList.remove("input-error");
    }
    else {
        emailError.textContent = result;
        emailInput.classList.add("input-error")
    }
    });

userTypeInput.addEventListener("blur", function() {
    let result = validateUserType();
    if(result === defaultMsg) {
        userTypeError.textContent = defaultMsg;
        userTypeInput.classList.remove("input-error");
    }
    else {
        userTypeError.textContent = result;
        userTypeInput.classList.add("input-error");
    }
    });

/*
Event listener for submit button that will prevent submission if there are errors present in the input
fields
*/
signup.addEventListener("submit", function(e) {
    let isValid = validate();

    if(!isValid){
        e.preventDefault();
    }
});
