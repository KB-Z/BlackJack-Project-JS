const cardSuits = ["Spades", "Clubs", "Diamonds", "Hearts"];
const cardValues = ["A","K","Q","J","10","9","8","7","6","5","4","3","2"];
let cardDeck = new Array();
let players = new Array();
let currentPlayer = 0;

// event listener for initial game start on page load
window.addEventListener('load', function(){
    createDeck();
    deckShuffle();
    createPlayers(1);
});

// player creation, could be expanded for additional players if desired
const createPlayers = (num) => {
    players = new Array();
    for (let i = 1; i <= num; i++) {
        let hand = new Array();
        let player = {Name: 'Player' + i, ID: i, Points: 0, Hand: hand};
        players.push(player);        
    }
};

// UI handler for players created
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

// assignes value to face cards, currently does not account for situations where Ace is worth 1
const createDeck = () => {
    cardDeck = new Array();
    for (let i = 0; i < cardValues.length; i++) {
        for (let x = 0; x < cardSuits.length; x++) {
            let weight = parseInt(cardValues[i]);
            if (cardValues[i] == "J" || cardValues[i] == "Q" || cardValues[i] == "K") {
                weight = 10;
            }
            if (cardValues[i] == "A") {
                weight = 11;
            }
            let card = {Value: cardValues[i], Suit: cardSuits[x], Weight: weight };
            cardDeck.push(card);
            //console.log(cardDeck);            
        }        
    }
};

// shuffle function, currently shuffles the deck 1000 times before each draw
const deckShuffle = () => {
    for (let i = 0; i < 1000; i++) {
        let selection1 = Math.floor((Math.random() * cardDeck.length));
        let selection2 = Math.floor((Math.random() * cardDeck.length));
        let selected = cardDeck[selection1];

        cardDeck[selection1] = cardDeck[selection2];
        cardDeck[selection2] = selected;        
    }
    //console.log(cardDeck);
};


// intial deal of 2 cards per player
const deal = () => {
    for (let i = 0; i < 2; i++) {
        for (let x = 0; x < players.length; x++) {
            let card = cardDeck.pop();
            players[x].Hand.push(card);
            renderCard(card,x);
            updatePoints();            
        }        
    }
    updateDeck();
};

// function pulls points per player and writes to DOM
const updatePoints = () => {
    for (var i = 0 ; i < players.length; i++) {
        getPoints(i);
        document.getElementById('points_' + i).innerHTML = players[i].Points;
    }
};

// points handler for UI/game logic, handles if ace should be valued as 1 or 11
const getPoints = (player) => {
    let points = 0;
    let ace = 0;
    let hasAce = 0;

    for(var i = 0; i < players[player].Hand.length; i++) {
        if (players[player].Hand[i].Weight == 11) {
            ace++;
            points += players[player].Hand[i].Weight;
        } else {
        points += players[player].Hand[i].Weight;
        //console.log("Non-Ace Points " + points);
        }             
    }
    if (ace >= 1) {
        if (hasAce >= 1 || points > 21) {
            points -= 10;
            hasAce++;
        }
    }
    players[player].Points = points;
    //console.log("Aces " + ace);    
    //console.log("Total Points " + points);
    
    //return points;
};

// function for Hit button
const hit = () => {
    let card = cardDeck.pop();
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    updatePoints();
    updateDeck();
    check();
};

// function for Stay button
const stay = () => {
    if (currentPlayer != players.length - 1) {
        document.getElementById('player_' + currentPlayer).classList.remove('active');
        currentPlayer += 1;
        document.getElementById('player_' + currentPlayer).classList.add('active');      
    } else {
        end();
    }
};

// UI handler for deck counter
const updateDeck = () => {
    document.getElementById('deckcount').innerHTML = cardDeck.length;
};

// end game function, checks for player going over 21
const end = () => {
    let winner = -1;
    let score = 0;

    for (let i = 0; i < players.length; i++) {
        if (players[i].Points > score && players[i].Points < 22) {
            winner = i;
        }
        score = players[i].Points;
    }
    document.getElementById('status').innterHTML = 'Winner: Player ' + players[winner].ID;
    document.getElementById('status').style.display = "inline-block";
};

// check for win condition
const check = () => {
    if (players[currentPlayer].Points > 21) {
        document.getElementById('status').innerHTML = 'Player: ' + players[currentPlayer].ID + ' Lost';
        document.getElementById('status').style.display = "inline-block";
        end();
    }
};

// DOM render function for cards
const renderCard = (card, player) => {
    let hand = document.getElementById('hand_' + player);
    hand.appendChild(getCardElement(card));
};

// DOM card element
const getCardElement = (card) => {
    let cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.innerHTML = card.Suit + '<br/>' + card.Value;
    return cardElement;
};

// game logic to start the game
const gameStart = () => {
    document.getElementById('btnStart').value = 'Restart';
    document.getElementById('status').style.display="none";
    currentPlayer = 0;
    createDeck();
    deckShuffle();
    createPlayers(2); // create 2 players for simple game
    playerUI();
    deal();
    document.getElementById('player_' + currentPlayer).classList.add('active');
};