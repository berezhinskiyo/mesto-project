import * as validate from './validate'
const addPopup = document.querySelector('.popup_type_add');
const addPopupHeading = addPopup.querySelector('#heading');
const addPopupSubheading = addPopup.querySelector('#subheading');
const addPopupForm = addPopup.querySelector('.popup__admin');
const addPopupButton = addPopup.querySelector('.popup__button');

const editPopup = document.querySelector('.popup_type_edit');
const editPopupHeading = editPopup.querySelector('#heading');
const editPopupSubheading = editPopup.querySelector('#subheading');
const editPopupForm = editPopup.querySelector('.popup__admin');
const editPopupButton = editPopup.querySelector('.popup__button');

export const imagePopup = document.querySelector('.popup_type_image');
export const imagePopupImg = imagePopup.querySelector('.popup__img');
export const imagePopupSubtitle = imagePopup.querySelector('.popup__subtitle');

const handleEscapeKey = (evt) => {
    if (evt.key === "Escape") {
        closePopup(document.querySelector('.popup_opened'));
    }
}
const handleOverlayClick = (evt) => {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
}

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', handleOverlayClick);
    document.addEventListener('keydown', handleEscapeKey);
}
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', handleOverlayClick);
    document.removeEventListener('keydown', handleEscapeKey);
}


export function subscribePopupToEvents(createElementCallBack, profileName, profilePosition,) {

    document.querySelectorAll('.popup__close-button').forEach(el => el.addEventListener('click', function (evt) {
        closePopup(evt.currentTarget.closest('.popup'));
    }));

    document.querySelector('.profile__edit-button').addEventListener('click', function () {
        openPopup(editPopup);
        validate.clear(editPopup, editPopupButton, true, validate.validationConfig);
        editPopupHeading.value = profileName.textContent;
        editPopupSubheading.value = profilePosition.textContent;

    });

    document.querySelector('.profile__add-button').addEventListener('click', function () {
        openPopup(addPopup);
        validate.clear(addPopup, addPopupButton, false, validate.validationConfig);
        addPopupHeading.value = '';
        addPopupSubheading.value = '';
    });

    addPopupForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        createElementCallBack({
            name: addPopupHeading.value,
            link: addPopupSubheading.value
        });
        closePopup(addPopup);
    });

    editPopupForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        profileName.textContent = editPopupHeading.value;
        profilePosition.textContent = editPopupSubheading.value;
        closePopup(editPopup);
    });
}

