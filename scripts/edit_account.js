/*
Author: Gobi Mohanathas
File Name: edit_account.js
Date of Creation: January 5, 2025
Purpose: External Javascript script handling dynamic events and form validation for edit account page
*/

// Global variables that store references to specific form elements in the DOM, to modify values later
let emailInput = document.querySelector("#email");
let usernameInput = document.querySelector("#username");
let passwordInput = document.querySelector("#password");
let confirmPasswordInput = document.querySelector("#confirm-password");
let saveChanges = document.querySelector('form[name="edit-account-form"]');

/* 
Global variables that store specific error messages depending on the form element also including a blank default message
for the case of no errors present
*/
let defaultMsg = "";
let emailErrorMsg = "✕ Email address should be of the format xyz@xyz.xyz.";
let usernameErrorMsg = "✕ User name should be within 50 characters long.";
let passwordErrorMsg = "✕ Password should be within 50 characters long.";
let confirmPasswordErrorMsg = "✕ Please retype password.";


/*
Create and append paragraph element with class of warning to each corresponding form element for displaying 
validation error messages
*/
let emailError = document.createElement('p');
emailError.setAttribute("class", "warning");
emailInput.insertAdjacentElement('afterend', emailError);

let usernameError = document.createElement('p');
usernameError.setAttribute("class", "warning");
usernameInput.insertAdjacentElement('afterend', usernameError);

let passwordError = document.createElement('p');
passwordError.setAttribute("class", "warning");
passwordInput.insertAdjacentElement('afterend', passwordError);

let confirmPasswordError = document.createElement('p');
confirmPasswordError.setAttribute("class", "warning");
confirmPasswordInput.insertAdjacentElement('afterend', confirmPasswordError);

/* 
Validate email function that validates whether the email has correct structure based on regex pattern and returns
a blank string (no error) or the email error message
*/
function validateEmail() {
    let email = emailInput.value;
    let regexp = /^\S+@\S+\.\S+$/;
    let error;

    if(email === "") {
        error = defaultMsg;
    }

    else if(regexp.test(email)) {
        error = defaultMsg;
    }

    else {
        error = emailErrorMsg;
    }

    return error;
}

/* 
Validate username function that validates whether the username has equal to or less than 50  characters and returns
a blank string (no error) or the username error message
*/
function validateUsername() {
    let username = usernameInput.value.trim();

    if(username.length > 50) {
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

    if(password.length > 50) {
        return passwordErrorMsg;
    }
    else {
        return defaultMsg;
    }
}

/* 
Validate confirm password function that validates whether the confirm password field matches the password field 
and returns a blank string (no error) or the confirm password error message
*/
function validateConfirmPassword() {
    let password = passwordInput.value;
    let confirmPassword = confirmPasswordInput.value;

    if(confirmPassword !== password) {
        return confirmPasswordErrorMsg;
    }
    else {
        return defaultMsg;
    }
}

/*
Main form validation function. Checks all input fields, displays appropriate error message (if applicable), applies
and removes styling for error messages, and returns whether the form is valid or not. Additionally, converts the username
to lowercase if validation passes
*/
function validate() {
    let valid = true;

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

    let confirmPasswordValidation = validateConfirmPassword();
    if(confirmPasswordValidation !== defaultMsg) {
        confirmPasswordError.textContent = confirmPasswordValidation;
        confirmPasswordInput.classList.add("input-error");
        valid = false;   
    }
    else {
        confirmPasswordError.textContent = defaultMsg;
        confirmPasswordInput.classList.remove("input-error");
    }

    return valid;
}

// Function that resets all form error messages (assigning blank string) and removes all error message styling
function resetFormError() {
    emailError.textContent = defaultMsg;
    usernameError.textContent = defaultMsg;
    passwordError.textContent = defaultMsg;
    confirmPasswordError.textContent = defaultMsg;

    emailInput.classList.remove("input-error");
    usernameInput.classList.remove("input-error");
    passwordInput.classList.remove("input-error");
    confirmPasswordInput.classList.remove("input-error");
}

// Attatch event listener to forms reset element and clears error messages as well as styling for the error messages
document.querySelector('form[name="edit-account-form"]').addEventListener("reset", resetFormError);

/*
Adding event listener to each form element of type "blur". When user moves focus away from corresponding input form
element, applies/removes error styling in real-time (validates field as soon as focus is moved away) 
*/
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

    if(confirmPasswordInput.value !== "") {
        let result2 = validateConfirmPassword();
        
        if(result2 === defaultMsg) {
            confirmPasswordError.textContent = defaultMsg;
            confirmPasswordInput.classList.remove("input-error");
        }
        else {
            confirmPasswordError.textContent = result2;
            confirmPasswordInput.classList.add("input-error");
        }
    }
    });

confirmPasswordInput.addEventListener("blur", function() {
    let result = validateConfirmPassword();
    if(result === defaultMsg) {
        confirmPasswordError.textContent = defaultMsg;
        confirmPasswordInput.classList.remove("input-error");
    }
    else {
        confirmPasswordError.textContent = result;
        confirmPasswordInput.classList.add("input-error");
    }
    });

/*
Event listener for submit button that will prevent submission if there are errors present in the input
fields
*/
saveChanges.addEventListener("submit", function(e) {
    let isValid = validate();

    if(!isValid){
        e.preventDefault();
    }
});



