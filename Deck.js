const cardSuits = ["Spades", "Clubs", "Diamons", "Hearts"];
const cardValues = ["A","K","Q","J","10","9","8","7","6","5","4","3","2"];
let cardDeck = new Array();

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
}

const deckShuffle = () => {
    for (let i = 0; i < 100; i++) {
        let selection1 = Math.floor((Math.random() * cardDeck.length));
        let selection2 = Math.floor((Math.random() * cardDeck.length));
        let selected = cardDeck[selection1];

        cardDeck[selection1] = cardDeck[selection2];
        cardDeck[selection2] = selected;        
    }
}