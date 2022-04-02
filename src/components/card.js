
import arkhyzImage from './../images/arkhyz.jpg';
import chelyabinsk_oblastImage from './../images/chelyabinsk-oblast.jpg';
import ivanovoImage from './../images/ivanovo.jpg';
import kamchatkaImage from './../images/kamchatka.jpg';
import kholmogorsky_rayonImage from './../images/kholmogorsky-rayon.jpg';
import baikalImage from './../images/baikal.jpg';

import * as modal from './modal.js'

const initialCards = [
    {
        name: 'Архыз',
        link: arkhyzImage
    },
    {
        name: 'Челябинская область',
        link: chelyabinsk_oblastImage
    },
    {
        name: 'Иваново',
        link: ivanovoImage
    },
    {
        name: 'Камчатка',
        link: kamchatkaImage
    },
    {
        name: 'Холмогорский район',
        link: kholmogorsky_rayonImage
    },
    {
        name: 'Байкал',
        link: baikalImage
    }
];

const elements = document.querySelector('.elements');
const template = document.querySelector('#element_template');
const profileName = document.querySelector('.profile__name');
const profilePosition = document.querySelector('.profile__position');



function createCard(item) {
    const clone = template.content.cloneNode(true);
    const img = clone.querySelector('.elements__element-img');
    img.src = item.link;
    img.alt = item.name;
    clone.querySelector('.elements__element-title').textContent = item.name;

    clone.querySelector('.elements__element-title-button').addEventListener('click', function (evt) {
        evt.currentTarget.classList.toggle('elements__element-title-button_clicked');
    });
    img.addEventListener('click', function (evt) {
        modal.openPopup(modal.imagePopup);
        modal.imagePopupImg.src = item.link;
        modal.imagePopupImg.alt = item.name;
        modal.imagePopupSubtitle.textContent = item.name;
    });

    clone.querySelector('.elements__element-delete-button').addEventListener('click', function (evt) {
        elements.removeChild(evt.currentTarget.closest('.elements__element'));
    });
    return clone;
}

function createElement(item) {
    elements.prepend(createCard(item));
}

function fillElements() {
    const documentFragment = document.createDocumentFragment();
    initialCards.forEach(item => documentFragment.append(createCard(item)));
    elements.prepend(documentFragment);
}

export function initializeCards() {
    fillElements();
    modal.subscribePopupToEvents(createElement, profileName, profilePosition);
}