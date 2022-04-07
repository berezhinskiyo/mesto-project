import * as validate from './validate'
import * as api from './api.js'
import * as utils from './utils.js'


export const confirmPopup = document.querySelector('.popup_type_confirmation');
const confirmPopupButton = confirmPopup.querySelector('.popup__button');


const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarPopupForm = avatarPopup.querySelector('.popup__admin');
const avatarPopupSubheading = avatarPopup.querySelector('#subheading');
const avatarPopupButton = avatarPopup.querySelector('.popup__button');


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
const elements = document.querySelector('.elements');


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

const getCardId = (el) => {
    return el.closest('.popup__admin').querySelector('#card_id').textContent;
}

export function subscribePopupToEvents(createElementCallBack, profileName, profilePosition, profileAvatar) {

    document.querySelectorAll('.popup__close-button').forEach(el => el.addEventListener('click', function (evt) {
        closePopup(evt.currentTarget.closest('.popup'));
    }));

    document.querySelector('.profile__edit-button').addEventListener('click', function () {
        openPopup(editPopup);
        validate.clear(editPopup, editPopupButton, true, validate.validationConfig);
        editPopupHeading.value = profileName.textContent;
        editPopupSubheading.value = profilePosition.textContent;

    });

    document.querySelector('.profile__avatar__overlay').addEventListener('click', function () {
        openPopup(avatarPopup);
        validate.clear(avatarPopup, avatarPopupButton, false, validate.validationConfig);
        avatarPopupSubheading.value = '';
    });

    document.querySelector('.profile__add-button').addEventListener('click', function () {
        openPopup(addPopup);
        validate.clear(addPopup, addPopupButton, false, validate.validationConfig);
        addPopupHeading.value = '';
        addPopupSubheading.value = '';
    });

    addPopupForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        utils.addDotesButtonName(addPopupButton);
        createElementCallBack({
            name: addPopupHeading.value,
            link: addPopupSubheading.value
        })
            .then(() => closePopup(addPopup))
            .catch((err) => {
                console.log(err);
            })
            .finally(() => utils.removeDotesFromButtonName(addPopupButton))


    });

    editPopupForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        utils.addDotesButtonName(editPopupButton);
        api.patchProfile({
            name: editPopupHeading.value,
            about: editPopupSubheading.value
        })
            .then((data) => {
                profileName.textContent = data.name;
                profilePosition.textContent = data.about;
                closePopup(editPopup);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                utils.removeDotesFromButtonName(editPopupButton);
            });


    });

    avatarPopupForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        utils.addDotesButtonName(avatarPopupButton);
        api.patchAvatar(avatarPopupSubheading.value)
            .then((data) => {
                profileAvatar.src = avatarPopupSubheading.value;
                closePopup(avatarPopup);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                utils.removeDotesFromButtonName(avatarPopupButton);
            });
    });


    confirmPopup.addEventListener('submit', function (evt) {
        evt.preventDefault();
        utils.addDotesButtonName(confirmPopupButton);
        api.deleteCard(getCardId(evt.target))
            .then(() => {
                elements.removeChild(elements.querySelector(`#_${getCardId(evt.target)}`).closest('.elements__element'));
                closePopup(confirmPopup);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                utils.removeDotesFromButtonName(confirmPopupButton);
            });
    });
}

