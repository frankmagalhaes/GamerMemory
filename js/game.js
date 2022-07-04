const container = document.querySelector('.container');
const local = localStorage;
const modal = document.getElementById("modal");
const temp = document.getElementsByName("temporizador");
const model = document.querySelector('.modal-content');
const lose = document.querySelector('.lose-game-modal')


let temporizador = document.getElementById('temporizador');

const champs = [
    'Azir',
    'Irelia',
    'Jinx',
    'Seraphine',
    'Viego',
    'Yuumi',
    'lux',
    'malzaha',
    'janna',
    'graves',
];

getPlayer = () => {
    localStorage.getItem("player")
    document.body.querySelector(".top").innerHTML = `Invocador  ${localStorage.getItem("player").toLocaleUpperCase()} `;

}
getPlayer();



temporizador.innerHTML = 80;

    let intervalo = setInterval(function () {
        let novoValor = parseInt(temporizador.innerHTML, 10) - 1;
        temporizador.innerHTML = novoValor;
        if (novoValor === 0) {
            clearInterval(intervalo);
            loseModal()
        }     
    }, 1000);



const stopTimeout = function() {
    clearInterval(intervalo);
};




function loseModal() {
    const modalClose = document.getElementsByClassName("modal-losed")[0];
    lose.style.visibility = "visible";


    modalClose.onclick = function () {
        lose.style.visibility = "hidden";

    };


    modalClose.onclick = function (event) {
        if (event.target == modalClose) {
            lose.style.visibility = "hidden";
            window.location = '../index.html'
        }
    };
}

function displayModal() {
    const modalClose = document.getElementsByClassName("modal-close")[0];
    modal.style.visibility = "visible";
    
    stopTimeout();

    modalClose.onclick = function () {
        modal.style.visibility = "hidden";

    };

    window.onclick = function (event) {
        if (event.target == modalClose) {
            modal.style.visibility = "hidden";
            window.location = '../index.html'

        }
    };

}

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 20) {
        displayModal();
        stopTimeout();
    }
}


const checkCard = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {

        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 500);
    }
}

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCard();
    }
}
const createCard = (champ) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');


    front.style.backgroundImage = `url('../images/${champ}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);

    card.setAttribute('data-character', champ)
    return card;
}

const loadGame = () => {

    const duplicateCharacters = [...champs, ...champs];

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((champ) => {

        const card = createCard(champ);
        container.appendChild(card);

    });
}

loadGame();

const form = document.querySelector('.game-form')

const playSubmit = (event) => {
    event.preventDefault();


    window.location.href = './game.html';

}
form.addEventListener('submit', playSubmit);
