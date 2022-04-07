
import * as modal from './modal.js'
import * as api from './api.js'

const elements = document.querySelector('.elements');
const template = document.querySelector('#element_template');
const profileName = document.querySelector('.profile__name');
const profilePosition = document.querySelector('.profile__position');
const profileAvatar = document.querySelector('.profile__avatar');


const setLikes = (cardJSON, likes, evt) => {
    likes.textContent = cardJSON.likes.length;
    evt.target.classList.toggle('elements__element-block__likes__button_clicked');
}

const getCardId = (el) => {
    return el.closest('.elements__element').querySelector('.elements__element-img').id.replace('_', '');
}

function createCard(data) {
    const clone = template.content.cloneNode(true);
    const img = clone.querySelector('.elements__element-img');
    const likes = clone.querySelector('.elements__element-block__likes__count');
    img.src = data.link;
    img.alt = data.name;
    img.id = '_' + data._id;
    clone.querySelector('.elements__element-block__title').textContent = data.name;
    likes.textContent = data.likes.length;

    clone.querySelector('.elements__element-block__likes__button').addEventListener('click',
        function (evt) {
            if (evt.target.classList.contains('elements__element-block__likes__button_clicked'))
                api.deleteLike(getCardId(evt.target))
                    .then((cardJSON) => setLikes(cardJSON, likes, evt))
                    .catch((err) => {
                        console.log(err);
                    });
            else
                api.putLike(getCardId(evt.target))
                    .then((cardJSON) => setLikes(cardJSON, likes, evt))
                    .catch((err) => {
                        console.log(err);
                    });
        });

    img.addEventListener('click', function (evt) {
        modal.openPopup(modal.imagePopup);
        modal.imagePopupImg.src = data.link;
        modal.imagePopupImg.alt = data.name;
        modal.imagePopupSubtitle.textContent = data.name;
    });


    const deleteButton = clone.querySelector('.elements__element-delete-button');
    deleteButton.addEventListener('click', function (evt) {
        modal.confirmPopup.querySelector('#card_id').textContent = getCardId(evt.target);
        modal.openPopup(modal.confirmPopup);
        //  elements.removeChild(evt.currentTarget.closest('.elements__element'));
    });


    if (data.owner._id != profileName.id) {
        deleteButton.classList.add('elements__element-delete-button_hidden');

    }

    const likesButton = clone.querySelector('.elements__element-block__likes__button');
    if (data.likes.some(e => e._id === profileName.id)) {
        likesButton.classList.add('elements__element-block__likes__button_clicked');
    }
    return clone;
}

function createElement(item) {

    return api.postCard({
        name: item.name,
        link: item.link
    })
        .then((data) => {
            elements.prepend(createCard(data));
        });
}

const loadData = () => {
    Promise.all([api.getProfile(), api.getInitialCards()])
        .then(([userData, cards]) => {
            profileName.textContent = userData.name;
            profilePosition.textContent = userData.about;
            profileAvatar.src = userData.avatar;
            profileName.id = userData._id;

            const documentFragment = document.createDocumentFragment();
            cards.forEach(item => documentFragment.append(createCard(item)));
            elements.prepend(documentFragment);

        })
        .catch(err => {
            console.log(err);
        });
}

export const initialize = () => {
    loadData();
    modal.subscribePopupToEvents(createElement, profileName, profilePosition, profileAvatar);
}
