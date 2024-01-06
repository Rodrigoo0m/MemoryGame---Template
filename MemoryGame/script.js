// script.js
document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L']; // 24 cards / 12 pairs

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    function createBoard() {
        shuffle(cards);
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.setAttribute('data-name', card);

            const frontFace = document.createElement('div');
            frontFace.classList.add('front');

            const backFace = document.createElement('div');
            backFace.classList.add('back');
            backFace.textContent = card; // Or set the image for the card

            cardElement.appendChild(frontFace);
            cardElement.appendChild(backFace);

            gameBoard.appendChild(cardElement);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('is-flipped');

        if (!hasFlippedCard) {
            // first click
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        // second click
        secondCard = this;

        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.name === secondCard.dataset.name;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('is-flipped');
            secondCard.classList.remove('is-flipped');

            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    createBoard();

    document.querySelectorAll('.card').forEach(card => card.addEventListener('click', flipCard));
});
