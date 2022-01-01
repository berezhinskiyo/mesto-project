

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
let popup = document.querySelector('.popup');
let imagePopup = document.querySelector('.image-popup');
let elements = document.querySelector('.elements');

function insertElement(element){
    elements.insertAdjacentHTML('afterbegin',`
            <div class="elements__element">
                <img class="elements__element-img" src="${element.link}" alt="${element.name}">
                <button type="button" class="elements__element-delete-button button"> </button>
                <div class="elements__element-block">
                    <h3 class="elements__element-title">${element.name}</h3>
                    <button type="button" class="elements__element-title-button button"> </button>
                </div>
            </div>`);
    elements.querySelector('.elements__element-title-button').addEventListener('click',function(evt){
        evt.currentTarget.classList.toggle('elements__element-title-button_clicked');
    });

    elements.querySelector('.elements__element-img').addEventListener('click',function(evt){
        imagePopup.classList.add('image-popup_opened');
        imagePopup.querySelector('.image-popup__img').src = evt.currentTarget.src;
        imagePopup.querySelector('.image-popup__img').alt = evt.currentTarget.parentNode.querySelector('.elements__element-title').textContent;
        imagePopup.querySelector('.image-popup__subtitle').textContent =  evt.currentTarget.parentNode.querySelector('.elements__element-title').textContent;
        
    });

    elements.querySelector('.elements__element-delete-button').addEventListener('click',function(evt){
        elements.removeChild(evt.currentTarget.parentNode);
    });
        
}
imagePopup.querySelector('.image-popup__close-button').addEventListener('click',function (){
    imagePopup.classList.remove('image-popup_opened');
});

function initPopup(isAdd, p){
    p.classList.add('popup_opened');
    
    if(isAdd)
    {
        p.classList.add('popup_add');
        p.querySelector('.popup__heading').textContent = "Новое место";
        p.querySelector('#heading').placeholder = "Название";
        p.querySelector('#subheading').placeholder = "Ссылка на картинку";   
        p.querySelector('.popup__button').textContent = "Создать" ;
        p.querySelector('#heading').value = '';
        p.querySelector('#subheading').value = '';
    }
    else
    {
        p.classList.add('popup_edit');
        p.querySelector('.popup__heading').textContent = "Редактировать профиль";
        p.querySelector('#heading').placeholder = "Имя";
        p.querySelector('#subheading').placeholder = "О себе";  
        p.querySelector('.popup__button').textContent = "Сохранить" ;
        p.querySelector('#heading').value = document.querySelector('.profile__name').textContent;
        p.querySelector('#subheading').value = document.querySelector('.profile__position').textContent;
    }

}

initialCards.forEach(element => insertElement(element));


popup.querySelector('.popup__close-button').addEventListener('click',function (){
    popup.classList.remove('popup_opened');
   
    
    if(popup.classList.contains('popup_edit')){
        popup.classList.remove('popup_edit');
    }
    if(popup.classList.contains('popup_add')){
        popup.classList.remove('popup_add');
    }
});
document.querySelector('.profile__edit-button').addEventListener('click',function (){
    initPopup(false,popup);
});

document.querySelector('.profile__add-button').addEventListener('click',function (){
    initPopup(true,popup);
});

popup.querySelector('.popup__admin').addEventListener('submit',function (evt){
    evt.preventDefault(); 
    if(popup.classList.contains('popup_edit'))
    {
        document.querySelector('.profile__name').textContent = popup.querySelector('#heading').value;
        document.querySelector('.profile__position').textContent = popup.querySelector('#subheading').value; 
        popup.classList.remove('popup_edit');
    } 
    else if(popup.classList.contains('popup_add'))
    {
        insertElement({ 
            name: popup.querySelector('#heading').value,
            link: popup.querySelector('#subheading').value
          });
        popup.classList.remove('popup_add');
    }

    popup.classList.remove('popup_opened');
  
});

