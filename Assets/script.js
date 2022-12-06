/*
Name        : Jashanpreet
Student ID  : 168854214
Email       : jjashanpreet@myseneca.ca
Section     : WEB222-NII
*/

// ==================== Code for responsive navbar ====================
let menu = document.querySelector('.menu-icon');
let navbar = document.querySelector('.nav-links');

// Making the navbar responsive using a menu icon
menu.addEventListener('click', function() {
    navbar.classList.toggle('open-menu');
    menu.classList.toggle('move');
});

// The navbar should collapse on small screens when scrolled
window.onscroll = () => {
    navbar.classList.remove('open-menu');
    menu.classList.remove('move');
}

// ==================== Code for getting the pay rate input field when hiring option is chosen ====================
let otherRadioButton = document.getElementById('Other');
let JobOfferRadioButton = document.getElementById('Job-Offer');
let SchoolRadioButton = document.getElementById('School');

// Variable to make sure that the form is only printed once no matter how many times the hiring button is clicked
var clicked = 0;

// Adding event listeners
otherRadioButton.addEventListener('click', function() {
    if (clicked == 0) {
        generateTopicInput();
        clicked++;
    }
});

JobOfferRadioButton.addEventListener('click', function() {
    if (clicked > 0) {
        deleteTopicInput();
        clicked = 0;
    }
});

SchoolRadioButton.addEventListener('click', function() {
    if (clicked > 0) {
        deleteTopicInput();
        clicked = 0;
    }
});

// Function to generate the pay rate input field
function generateTopicInput() {
    let break1 = document.createElement('br');
    break1.id = 'b1';
    let break2 = document.createElement('br');
    break2.id = 'b2';
    let break3 = document.createElement('br');
    break3.id = 'b3';

    // Creating a label
    let node1 = document.createElement("label");
    let textNode = document.createTextNode("Other topic Specification: ");
    node1.appendChild(textNode);
    node1.id = 'topic-label';

    // Creating the input Field
    let node2 = document.createElement("input");
    node2.id = 'topic-input';
    node2.type = 'text';
    node2.placeholder = 'topic name';
    node2.classList.add('format')

    document.querySelector(".radio-btns").appendChild(break1);
    document.querySelector(".radio-btns").appendChild(break2);
    document.querySelector(".radio-btns").appendChild(node1);
    document.querySelector(".radio-btns").appendChild(break3);
    document.querySelector(".radio-btns").appendChild(node2);
}

// Function to delete the pay rate input field
function deleteTopicInput() {
    let label = document.getElementById('topic-label');
    let input = document.getElementById('topic-input');
    let b1 = document.getElementById('b1');
    let b2 = document.getElementById('b2');
    let b3 = document.getElementById('b3');

    document.querySelector(".radio-btns").removeChild(b1);
    document.querySelector(".radio-btns").removeChild(b2);
    document.querySelector(".radio-btns").removeChild(b3);
    document.querySelector(".radio-btns").removeChild(input);
    document.querySelector(".radio-btns").removeChild(label);
}

// ==================== Form Validation Code ====================
let messages = [];
const form = document.getElementById('contact-form');
const errorElement = document.getElementById('error');

form.addEventListener('submit', (e) => {
    messages = [];

    // Calling all the validation functions
    validateName();
    validateEmail();
    validateAddress();
    validateCity();
    validateProvince();
    validatePostalCode();
    validateMessage();

    // Only validating the other topic if other option was clicked
    if (clicked > 0) {
        othertopicValidation();
    }

    // Displaying the errors
    if (messages.length > 0) {
        e.preventDefault();
        errorElement.innerHTML = `
        <h3>Incorrect Inputs Provided:</h3>
        <pre>${messages.join('\r\n')}</pre>
        `;
    }
})

form.addEventListener('reset', (e) => {
    messages = [];
    errorElement.innerHTML = '';
})

// Validation for the name input
function validateName() {
    const inputName = document.getElementById('name');
    if(nullChecker(inputName, 'Name')) {
        areAlphabets(inputName, '- Name should be valid - All characters should be alphabetical');
    }
}

// Validation for email input
function validateEmail() {
    const email = document.getElementById('email');
    if (nullChecker(email, 'Email')) {
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!(email.value.match(validRegex))) {
            messages.push("- Email Address is Invalid");
        }
    }    
}

// Validation for address
function validateAddress() {
    const address = document.getElementById('address');
    if (nullChecker(address, 'Address')) {
        if (address.value.length < 10) {
            messages.push("- Address should be atleast 10 characters long");
        }
    }
}

// Validation for city
function validateCity() {
    const city = document.getElementById('city');
    if(nullChecker(city, 'City')) {
        areAlphabets(city, '- City should be valid - All characters should be alphabetical');
    }
}

// Validation for Province
function validateProvince() {
    const province = document.getElementById('province');
    if(nullChecker(province, 'Province')) {
        areAlphabets(province, '- province should be valid - All characters should be alphabetical');
    }
}

// Validation for postal code
function validatePostalCode() {
    let postalCode = document.getElementById('pCode');
    let validRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    if (!(postalCode.value.match(validRegex))) {
        messages.push("- Invalid Postal Code");
    }
}

// Validation for message
function validateMessage() {
    const message = document.getElementById('message');
    if (nullChecker(message, 'Message')) {
        if (address.value.length < 10) {
            messages.push("- Message should be atleast 5 characters long");
        }
    }
}

// Validation for the topic name input field
function othertopicValidation() {
    const topicName = document.getElementById('topic-input');
    if(nullChecker(topicName, 'Topic')) {
        areAlphabets(topicName, '- Name should be valid - All characters should be alphabetical');
    }
}

// Ensures that the element is not empty
function nullChecker(element, elementName) {
    result = true;
    if (element.value === '' || element.value == null) {
        messages.push(`- ${elementName} is required`);
        result = false;
    }

    return result;
}

// Ensures that all the characters in the input field are alphabets
function areAlphabets(element, message) {
    let validRegex = /^[A-Za-z\s]+$/;
    if (!(element.value.match(validRegex))) {
        messages.push(message);
    }
}
