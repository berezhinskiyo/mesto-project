
const showError = (errorElement, inputElement, inputErrorClass) => {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(inputErrorClass)
}

const hideError = (errorElement, inputElement, inputErrorClass) => {
    errorElement.textContent = '';
    inputElement.classList.remove(inputErrorClass)
}

const checkInputValidity = (formElement, inputElement, config) => {
    const isInputNotValid = !inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    if (isInputNotValid) {
        showError(errorElement, inputElement, config);
    } else {
        hideError(errorElement, inputElement, config);
    }
}

const toggleButtonState = (button, isActive, inactiveButtonClass) => {
    if (isActive) {
        button.classList.remove(inactiveButtonClass);
        button.disabled = false;
    } else {
        button.classList.add(inactiveButtonClass);
        button.disabled = 'disabled';
    }
}


const setEventListers = (formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass }) => {
    const inputsList = formElement.querySelectorAll(inputSelector);
    const submitButton = formElement.querySelector(submitButtonSelector);


    Array.from(inputsList).forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            const isFormValid = formElement.checkValidity();
            checkInputValidity(formElement, inputElement, inputErrorClass)
            toggleButtonState(submitButton, isFormValid, inactiveButtonClass)
        })
    })
}

export const clear = (popup, submitButton, isFormValid, { formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass }) => {
    const formElement = popup.querySelector(formSelector);
    const inputsList = popup.querySelectorAll(inputSelector);


    Array.from(inputsList).forEach(inputElement => {
        formElement.querySelector(`#${inputElement.id}-error`).textContent = '';
        inputElement.classList.remove(inputErrorClass)
    })
    toggleButtonState(submitButton, isFormValid, inactiveButtonClass);
}

export const enableValidation = ({ formSelector, ...rest }) => {
    const forms = document.querySelectorAll(formSelector);
    Array.from(forms).forEach(formElement => {
        setEventListers(formElement, rest)
    })
}


export const validationConfig = {
    formSelector: '.popup__admin',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup__item_state_invalid',
}


enableValidation(validationConfig);


