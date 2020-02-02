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
            
        }
        
    }
    }