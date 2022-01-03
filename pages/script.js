const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const addPopup = document.querySelector('.popup_type_add');
const addPopupHeading = addPopup.querySelector('#heading');
const addPopupSubheading = addPopup.querySelector('#subheading');
const addPopupForm = addPopup.querySelector('.popup__admin');

const editPopup = document.querySelector('.popup_type_edit');
const editPopupHeading = editPopup.querySelector('#heading');
const editPopupSubheading = editPopup.querySelector('#subheading');
const editPopupForm = editPopup.querySelector('.popup__admin');

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImg = imagePopup.querySelector('.popup__img');
const imagePopupSubtitle = imagePopup.querySelector('.popup__subtitle');

const elements = document.querySelector('.elements');
const template = document.querySelector('#element_template');
const profileName = document.querySelector('.profile__name');
const profilePosition = document.querySelector('.profile__position');

function createCard(item){
    const clone = template.content.cloneNode(true);
    const img = clone.querySelector('.elements__element-img');
    img.src = item.link;
    img.alt = item.name;
    clone.querySelector('.elements__element-title').textContent = item.name;

    clone.querySelector('.elements__element-title-button').addEventListener('click',function(evt){
        evt.currentTarget.classList.toggle('elements__element-title-button_clicked');
    });

    img.addEventListener('click',function(evt){
        openPopup(imagePopup);
        imagePopupImg.src = item.link;
        imagePopupImg.alt = item.name;
        imagePopupSubtitle.textContent = item.name;
    });

    clone.querySelector('.elements__element-delete-button').addEventListener('click',function(evt){
        elements.removeChild(evt.currentTarget.parentNode);
    });
    return clone;
}

function createElement(item){ 
    elements.prepend(createCard(item));
}

function fillElements(){
    const documentFragment = document.createDocumentFragment();
    initialCards.forEach(item =>  documentFragment.append(createCard(item)));
    elements.prepend(documentFragment);
}   

fillElements(); 

function openPopup(popup){
    popup.classList.add('popup_opened');
}
function closePopup(popup){
    popup.classList.remove('popup_opened');
}

document.querySelectorAll('.popup__close-button').forEach(el => el.addEventListener('click',function (evt){
    closePopup(evt.currentTarget.closest('.popup'));    
}));

document.querySelector('.profile__edit-button').addEventListener('click',function (){
    openPopup(editPopup);
    editPopupHeading.value = profileName.textContent;
    editPopupSubheading.value = profilePosition.textContent;
    
});

document.querySelector('.profile__add-button').addEventListener('click',function (){
    openPopup(addPopup);
    addPopupHeading.value = '';
    addPopupSubheading.value = '';
});

addPopupForm.addEventListener('submit',function (evt){
    evt.preventDefault();
    createElement({ 
        name: addPopupHeading.value,
        link: addPopupSubheading.value
      });
    closePopup(addPopup);
});

editPopupForm.addEventListener('submit',function (evt){
    evt.preventDefault();
    profileName.textContent = editPopupHeading.value;
    profilePosition.textContent = editPopupSubheading.value; 
    closePopup(editPopup);
});

