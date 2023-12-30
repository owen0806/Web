function start_memoryGame(){
    const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const cardPairs = cards.concat(cards);
    let shuffledCards = shuffleArray(cardPairs);
    let removed_cards = 0;
    
    for(var i=0; i<4; i++){
        var content = '';
        for(var j=0; j<4; j++){
            content += shuffledCards[i*4 + j];
        }
        console.log(content);
    }
    console.log('\n');

    const memoryGame = document.getElementById('memory-game');

    shuffledCards.forEach(function (card, index) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.card = card;

        const cardFace = document.createElement('div');
        cardFace.classList.add('card-face');
        cardFace.textContent = card;

        cardElement.appendChild(cardFace);

        cardElement.addEventListener('click', flipCard);

        memoryGame.appendChild(cardElement);
    });

    let flippedCards = [];
    let lockBoard = false;

    function flipCard() {
        if (lockBoard) return;
        if (this === flippedCards[0]) return;

        this.classList.add('flip');

        if (flippedCards.length === 0) {
            flippedCards.push(this);
        } else {
            flippedCards.push(this);

            if (flippedCards[0].dataset.card === flippedCards[1].dataset.card) {
                // Match
                removed_cards += 2;
                setTimeout(() => {
                    flippedCards.forEach(card => card.classList.add('removed'));
                    flippedCards = [];
                }, 1000);
            } else {
                // Not a match
                lockBoard = true;
                setTimeout(() => {
                    flippedCards.forEach(card => card.classList.remove('flip'));
                    flippedCards = [];
                    lockBoard = false;
                }, 1000);
            }
            // Win
            if(removed_cards >= 16){
                setTimeout(() => {
                    window.alert('You win the game!!!');
                    mazeContainer.style.display = "flex";
                    game.style.display = 'none';
                }, 1100);
            }
        }
    }

    function shuffleArray(array) {
        let currentIndex = array.length, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }
}