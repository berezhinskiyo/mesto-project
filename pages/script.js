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
const editPopup = document.querySelector('.popup_type_edit');
const imagePopup = document.querySelector('.popup_type_image');
const elements = document.querySelector('.elements');
const template = document.querySelector('#element_template');
const imagePopupImg = imagePopup.querySelector('.popup__img');
const imagePopupSubtitle = imagePopup.querySelector('.popup__subtitle');

function insertElement(element){
    const clone = template.content.cloneNode(true);
    const img = clone.querySelector('.elements__element-img');
    img.src = element.link;
    img.alt = element.name;
    clone.querySelector('.elements__element-title').textContent = element.name;

    clone.querySelector('.elements__element-title-button').addEventListener('click',function(evt){
        evt.currentTarget.classList.toggle('elements__element-title-button_clicked');
    });

    clone.querySelector('.elements__element-img').addEventListener('click',function(evt){
        imagePopup.classList.add('popup_opened');
        imagePopupImg.src = evt.currentTarget.src;
        const elementTitle = evt.currentTarget.parentNode.querySelector('.elements__element-title').textContent;
        imagePopupImg.alt = elementTitle;
        imagePopupSubtitle.textContent = elementTitle;
        
    });

    clone.querySelector('.elements__element-delete-button').addEventListener('click',function(evt){
        elements.removeChild(evt.currentTarget.parentNode);
    });

    elements.insertBefore(clone, elements.firstChild);
}

function openPopup(p){
    p.classList.add('popup_opened');
    
    if(p.classList.contains('popup_type_add'))
    {
        p.querySelector('#heading').value = '';
        p.querySelector('#subheading').value = '';
    }
    else if(p.classList.contains('popup_type_edit'))
    {
        p.querySelector('#heading').value = document.querySelector('.profile__name').textContent;
        p.querySelector('#subheading').value = document.querySelector('.profile__position').textContent;
    }

}
function closePopup(p){
    p.classList.remove('popup_opened');
}


initialCards.forEach(element => insertElement(element));


document.querySelectorAll('.popup__close-button').forEach(el => el.addEventListener('click',function (evt){
    closePopup(evt.currentTarget.parentNode.parentNode);
}));

document.querySelector('.profile__edit-button').addEventListener('click',function (){
    openPopup(editPopup);
});

document.querySelector('.profile__add-button').addEventListener('click',function (){
    openPopup(addPopup);
});

document.querySelectorAll('.popup__admin').forEach(el => el.addEventListener('submit',function (evt){
    evt.preventDefault(); 
    const pp = evt.currentTarget.parentNode.parentNode;
    if(pp.classList.contains('popup_type_edit'))
    {
        document.querySelector('.profile__name').textContent = editPopup.querySelector('#heading').value;
        document.querySelector('.profile__position').textContent = editPopup.querySelector('#subheading').value; 
    } 
    else if(pp.classList.contains('popup_type_add'))
    {
        insertElement({ 
            name: addPopup.querySelector('#heading').value,
            link: addPopup.querySelector('#subheading').value
          });
 
    }
    closePopup(pp);
}));

