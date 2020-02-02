const cardSuits = ["Spades", "Clubs", "Diamons", "Hearts"];
const cardValues = ["A","K","Q","J","10","9","8","7","6","5","4","3","2"];
let cardDeck = new Array();
let players = new Array();

const createPlayers = (num) => {
    players = new Array();
    for (let i = 1; i <= num; i++) {
        let hand = new Array();
        let player = {Name: 'Player' + i, ID: i, Points: 0, Hand: hand};
        players.push(player);        
    }
};

const playerUI = () => {
    document.getElementById('players').innerHTML = '';
    for (let i = 0; i < players.length; i++) {

        let playerDiv = document.createElement('div');
        let playerIdDiv = document.createElement('div');
        let handDiv = document.createElement('div');
        let pointsDiv = document.createElement('div');

        pointsDiv.className = 'points';
        pointsDiv.id = 'points_' + i;
        playerDiv.id = 'player_' + i;
        playerDiv.className = 'player';
        handDiv.id = 'hand_' + i;

        playerIdDiv.innerHTML = players[i].ID;
        playerDiv.appendChild(playerIdDiv);
        playerDiv.appendChild(handDiv);
        playerDiv.appendChild(pointsDiv);
        document.getElementById('players').appendChild(playerDiv);     
        
    }
};

const createDeck = () => {
    cardDeck = new Array();
    for (let i = 0; i < cardValues.length; i++) {
        for (let x = 0; x < cardSuits.length; x++) {
            let weight = parseInt(cardValues[i]);
            if (cardValues[i] == "J" || cardValues[i] == "Q" || cardValues[i] == "K") {
                weight = 10;
            }
            if (cardValues[i] == "A") { //Need to come up with argument for Ace to have a value of 1
                weight = 11;
            }
            let card = {Value: cardValues[i], Suit: cardSuits[x], Weight: weight };
            cardDeck.push(card);            
        }        
    }
};

const deckShuffle = () => {
    for (let i = 0; i < 100; i++) {
        let selection1 = Math.floor((Math.random() * cardDeck.length));
        let selection2 = Math.floor((Math.random() * cardDeck.length));
        let selected = cardDeck[selection1];

        cardDeck[selection1] = cardDeck[selection2];
        cardDeck[selection2] = selected;        
    }
};

const deal = () => {
    for (let i = 0; i < 2; i++) {
        for (let x = 0; x < players.length; x++) {
            let card = deck.pop();
            players[x].Hand.push(card);
            renderCard(card,x);
            updatePoints();            
        }        
    }
    updateDeck();
};

const renderCard = (card, player) => {
    let hand = document.getElementById('hand_' + player);
    hand.appendChild(getCardUI(card));
};

const getCardUI = (card) => {
    let cardUI = document.createElement('div');
    cardUI.className = 'card';
    cardUI.innterHTML = card.Suit + ' ' + card.Value;
    return cardUI;
};

const gameStart = () => {
    document.getElementById('btnStart').value = 'Restart';
    document.getElementById('status').style.display="none";
    currentPlayer = 0;
    createDeck();
    deckShuffle();
    createPlayers(2); // create 2 players for simple game
    createPlayersUI();
    deal();
    document.getElementById('player_' + currentPlayer).classList.add('active');
};