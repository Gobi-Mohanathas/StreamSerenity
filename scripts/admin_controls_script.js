/*
Author: Gobi Mohanathas
File Name: admin_controls_script.js
Date of Creation: January 6, 2025
Purpose: External Javascript script handling dynamic events and form validation for admin_dashboard.php (Stream Flex Registration).
*/

// Global variables that store references to specific form elements in the DOM, to modify values later
let titleInput = document.querySelector("#title");
let genreInput = document.querySelector("#genre");
let ratingInput = document.querySelector("#rating");
let durationInput = document.querySelector("#duration");
let isPremiumInput = document.querySelector("#is_premium");
let mediaTypeInput = document.querySelector("#media_type");
let titleDeleteInput = document.querySelector("#title_delete");
let addMovieForm = document.querySelector('form.admin-add-form');

/* 
Global variables that store specific error messages depending on the form element also including a blank default message
for the case of no errors present
*/
let defaultMsg = "";
let titleErrorMsg = "✕ Title should be non-empty and 50 or less characters";
let genreErrorMsg = "✕ Genre should be non-empty and within 15 characters";
let ratingErrorMsg = "✕ Rating should be non empty and should be of the form and between 0.0 - 9.9";
let durationErrorMsg = "✕ Duration should be non empty and should be of the form xx:yy:zz or x:yy:zz (x = hours, y = minutes, z = seconds)";
let isPremiumErrorMsg = "✕ Please select Yes or No";
let mediaTypeErrorMsg = "✕ Please select Movie or Show";
let titleDeleteErrorMsg = "✕ Title should be non-empty and 50 or less characters";

/*
Create and append paragraph element with class of warning to each corresponding form element for displaying 
validation error messages
*/
let titleError = document.createElement('p');
titleError.setAttribute("class", "warning");
titleInput.insertAdjacentElement('afterend', titleError);

let genreError = document.createElement('p');
genreError.setAttribute("class", "warning");
genreInput.insertAdjacentElement('afterend', genreError);

let ratingError = document.createElement('p');
ratingError.setAttribute("class", "warning");
ratingInput.insertAdjacentElement('afterend', ratingError);

let durationError = document.createElement('p');
durationError.setAttribute("class", "warning");
durationInput.insertAdjacentElement('afterend', durationError);

let isPremiumError = document.createElement('p');
isPremiumError.setAttribute("class", "warning");
isPremiumInput.insertAdjacentElement('afterend', isPremiumError);

let mediaTypeError = document.createElement('p');
mediaTypeError.setAttribute("class", "warning");
mediaTypeInput.insertAdjacentElement('afterend', mediaTypeError);

let titleDeleteError = document.createElement('p');
titleDeleteError.setAttribute("class", "warning");
titleDeleteInput.insertAdjacentElement('afterend', titleDeleteError);

/* 
Validate title function that validates whether the title has 50 or less characters and returns
a blank string (no error) or the title error message
*/
function validateTitle() {
    let title = titleInput.value.trim();

    if(title === "" || title.length > 50) {
        return titleErrorMsg;
    }
    else {
        return defaultMsg;
    }
}

/*
Validate genre function that validates whether the genre has 15 or less characters and returns
a blank string (no error) or the genre error message
*/
function validateGenre() {
    let genre = genreInput.value.trim();

    if(genre === "" || genre.length > 15) {
        return genreErrorMsg;
    }
    else {
        return defaultMsg;
    }
}

/*
Validate rating function that validates whether the rating has correct structure based on regex
pattern and returns a blank string (no error) or the genre error message
*/
function validateRating() {
    let rating = ratingInput.value.trim();
    let regexp = /^[0-9]\.[0-9]$/;
    let error;

    if(regexp.test(rating)) {
        error = defaultMsg;
    }
    else {
        error = ratingErrorMsg;
    }

    return error;
}

/*
Validate duration function that validates whether the duration has correct structure based on regex
pattern and returns a blank string (no error) or the duration error message
*/
function validateDuration() {
    let duration = durationInput.value.trim();
    let regexp = /^[0-9]{1,2}:[0-5][0-9]:[0-5][0-9]$/;
    let error;

    if(regexp.test(duration)) {
        error = defaultMsg;
    }
    else {
        error = durationErrorMsg;
    }

    return error;
}

/*
Validate is premium function that validates whether an option of yes or no has been selected
and returns a blank string (no error) or the is premium error message
*/
function validateIsPremium() {
    let isPremium = isPremiumInput.value;

    if(isPremium === "1" || isPremium === "0") {
        return defaultMsg;
    }
    else {
        return isPremiumErrorMsg;
    }
}

/*
Validate media type function that validates whether an option of movie or show has been selected
and returns a blank string (no error) or the movie type error message
*/
function validateMediaType() {
    let mediaType = mediaTypeInput.value;

    if (mediaType === "movie" || mediaType === "show") {
        return defaultMsg;
    }
    else {
        return mediaTypeErrorMsg;
    }
}

/* 
Validate delete title function that validates whether the delete title has 50 or less characters 
and returns a blank string (no error) or the title error message
*/
function validateDeleteTitle() {
    let deleteTitle = titleDeleteInput.value

    if(deleteTitle === "" || deleteTitle.length > 50) {
        return titleDeleteErrorMsg;
    }
    else {
        return defaultMsg;
    }
}

/*
Main form validation function. Checks all input fields, displays appropriate error message (if applicable), applies
and removes styling for error messages, and returns whether the form is valid or not.
*/
function validate() {
    let valid = true;

    let titleValidation = validateTitle();
    if(titleValidation !== defaultMsg) {
        titleError.textContent = titleValidation;
        titleInput.classList.add("input-error")
        valid = false;   
    }
    else {
        titleError.textContent = defaultMsg;
        titleInput.classList.remove("input-error")
    }

    let genreValidation = validateGenre();
    if(genreValidation !== defaultMsg) {
        genreError.textContent = genreValidation;
        genreInput.classList.add("input-error");
        valid = false;   
    }
    else {
        genreError.textContent = defaultMsg;
        genreInput.classList.remove("input-error");
    }

    let ratingValidation = validateRating();
    if(ratingValidation !== defaultMsg) {
        ratingError.textContent = ratingValidation;
        ratingInput.classList.add("input-error");
        valid = false;   
    }
    else {
        ratingError.textContent = defaultMsg;
        ratingInput.classList.remove("input-error");
    }

    let durationValidation = validateDuration();
    if(durationValidation !== defaultMsg) {
        durationError.textContent = durationValidation;
        durationInput.classList.add("input-error");
        valid = false;   
    }
    else {
        durationError.textContent = defaultMsg;
        durationInput.classList.remove("input-error");
    }

    let isPremiumValidation = validateIsPremium();
    if(isPremiumValidation !== defaultMsg){
        isPremiumError.textContent = isPremiumValidation;
        isPremiumInput.classList.add("input-error");
        valid = false;
    }
    else {
        isPremiumError.textContent = defaultMsg;
        isPremiumInput.classList.remove("input-error");
    }

    let mediaTypeValidation = validateMediaType();
    if(mediaTypeValidation !== defaultMsg){
        mediaTypeError.textContent = mediaTypeValidation;
        mediaTypeInput.classList.add("input-error");
        valid = false;
    }
    else {
        mediaTypeError.textContent = defaultMsg;
        mediaTypeInput.classList.remove("input-error");
    }

    return valid;
}

// Function that resets all add form warning messages (assigning blank string) and removes all warning message styling
function resetAddFormError() {
    titleError.textContent = defaultMsg;
    genreError.textContent = defaultMsg;
    ratingError.textContent = defaultMsg;
    durationError.textContent = defaultMsg;
    isPremiumError.textContent = defaultMsg;
    mediaTypeError.textContent = defaultMsg;

    titleInput.classList.remove("input-error");
    genreInput.classList.remove("input-error");
    ratingInput.classList.remove("input-error");
    durationInput.classList.remove("input-error");
    isPremiumInput.classList.remove("input-error");
    mediaTypeInput.classList.remove("input-error");
}

// Attatch event listener to forms reset element and clears error messages as well as styling for the error messages
document.querySelector('form.admin-add-form').addEventListener("reset", resetAddFormError);

/*
Adding event listener to each form element of type "blur". When user moves focus away from corresponding input form
element, applies/removes error styling in real-time (validates field as soon as focus is moved away) 
*/
titleInput.addEventListener("blur", function() {
    let result = validateTitle();
    if(result === defaultMsg) {
        titleError.textContent = defaultMsg;
        titleInput.classList.remove("input-error");
    }
    else {
        titleError.textContent = result;
        titleInput.classList.add("input-error")
    }
    });

genreInput.addEventListener("blur", function() {
    let result = validateGenre();
    if(result === defaultMsg) {
        genreError.textContent = defaultMsg;
        genreInput.classList.remove("input-error");
    }
    else {
        genreError.textContent = result;
        genreInput.classList.add("input-error");
    }
    });

ratingInput.addEventListener("blur", function() {
    let result = validateRating();
    if(result === defaultMsg) {
        ratingError.textContent = defaultMsg;
        ratingInput.classList.remove("input-error");
    }
    else {
        ratingError.textContent = result;
        ratingInput.classList.add("input-error");
    }
    });

durationInput.addEventListener("blur", function() {
    let result = validateDuration();
    if(result === defaultMsg) {
        durationError.textContent = defaultMsg;
        durationInput.classList.remove("input-error");
    }
    else {
        durationError.textContent = result;
        durationInput.classList.add("input-error");
    }
    });

isPremiumInput.addEventListener("blur", function() {
    let result = validateIsPremium();
    if(result === defaultMsg) {
        isPremiumError.textContent = defaultMsg;
        isPremiumInput.classList.remove("input-error");
    }
    else {
        isPremiumError.textContent = result;
        isPremiumInput.classList.add("input-error");
    }
    });

mediaTypeInput.addEventListener("blur", function() {
    let result = validateMediaType();
    if(result === defaultMsg) {
        mediaTypeError.textContent = defaultMsg;
        mediaTypeInput.classList.remove("input-error");
    }
    else {
        mediaTypeError.textContent = result;
        mediaTypeInput.classList.add("input-error");
    }
    });

titleDeleteInput.addEventListener("blur", function() {
    let result = validateDeleteTitle();
    if(result === defaultMsg) {
        titleDeleteError.textContent = defaultMsg;
        titleDeleteInput.classList.remove("input-error");
    }
    else {
        titleDeleteError.textContent = result;
        titleDeleteInput.classList.add("input-error")
    }
    });

/*
Event listener for submit button that will prevent submission if there are errors present in the input
fields
*/
addMovieForm.addEventListener("submit", function(e) {
    let isValid = validate();

    if(!isValid){
        e.preventDefault();
    }
});