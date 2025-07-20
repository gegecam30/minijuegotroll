
const sonidoClick = new Audio('sounds/get.mp3');
const images = [
    'img/sexy.jpeg',
    'img/sexy.jpeg',
    'img/alecry.jpeg',
    'img/alecry.jpeg',
    'img/fabian1.jpeg',
    'img/fabian1.jpeg',
    'img/almuerzo.jpeg',
    'img/almuerzo.jpeg',
    'img/uwu.jpeg',
    'img/uwu.jpeg',
    'img/prepucio.jpeg',
    'img/prepucio.jpeg',
    'img/renzoface.jpeg',
    'img/renzoface.jpeg',
    'img/renzo2.jpeg',
    'img/renzo2.jpeg'
];


let gameContainer = document.getElementById('game');
let aciertos = 0;
let firstCard = null;
let secondCard = null;
let lock = false;

const imagenesDisponibles = [
    'img/sexy.jpeg',
    'img/uwu.jpeg',
    'img/prepucio.jpeg',
    'img/renzoface.jpeg',
    'img/almuerzo.jpeg',
    'img/alecry.jpeg',
    'img/fabian1.jpeg',
    'img/renzo2.jpeg',
    'img/joroba.jpeg',
    'img/fondo.jpeg', // sí, puedes usarlo como imagen troll
    // añade más si quieres
];

function iniciarNivel(nivel) {
    const totalPares = nivel * 2 + 2; // Ej: Nivel 1 = 4 pares, Nivel 2 = 6 pares, etc.
    const cartas = [];

    const seleccionadas = shuffle(imagenesDisponibles).slice(0, totalPares);

    seleccionadas.forEach(img => {
        cartas.push(img);
        cartas.push(img); // duplicamos cada imagen
    });

    const todasCartas = shuffle(cartas);

    // Reseteamos
    gameContainer.innerHTML = '';
    gameContainer.style.display = 'grid';
    document.getElementById('nivel-selector').style.display = 'none';
    aciertos = 0;
    firstCard = null;
    secondCard = null;
    lock = false;

    todasCartas.forEach(src => {
        const card = createCard(src);
        gameContainer.appendChild(card);
    });
}

function createCard(src) {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = src;

    card.appendChild(img);

   card.addEventListener('click', () => {
    if (lock || card.classList.contains('flipped')) return;
    
    sonidoClick.currentTime = 0; // reinicia si haces clic rápido
    sonidoClick.play();

    card.classList.add('flipped');


        if (!firstCard) {
            firstCard = card;
        } else {
            secondCard = card;
            lock = true;

            setTimeout(() => {
                if (firstCard.querySelector('img').src === secondCard.querySelector('img').src) {
                    aciertos++;

                    if (aciertos === document.querySelectorAll('.card').length / 2) {
                        setTimeout(() => {
                            alert("🎉 No nos importa perdedor 💪");
                            location.reload(); // vuelve al menú
                        }, 500);
                    }
                } else {
                    firstCard.classList.remove('flipped');
                    secondCard.classList.remove('flipped');
                }

                firstCard = null;
                secondCard = null;
                lock = false;
            }, 1000);
        }
    });

    return card;
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

