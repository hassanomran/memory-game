

"use strict"; 


const ScorePanel = {
    move : 0,
    time : 0,
    star : 3,
    incrementTime : () => {
        ScorePanel.time += 1;
        Rating.setTime(ScorePanel.time);
    },
    incrementMove : () => {
        ScorePanel.move += 1;
        Rating.setMoves(ScorePanel.move);

        if (ScorePanel.move === 30) {         
            ScorePanel.star = 2;
            Rating.setStars(2);
        } else if (ScorePanel.move === 40) {
            ScorePanel.star = 1;
            Rating.setStars(1);
        } else {
            // do nothing.
            
        }
    },
    //reset every thing to the start
    reset : () => {
        ScorePanel.move = 0;
        ScorePanel.star = 3;
        ScorePanel.time = 0;
        Rating.setMoves(0);
        Rating.setStars(3);
        Rating.setTime(0);
    }
}
Object.seal(ScorePanel);

//Timer global variable
let Timer;


//represents card's symbol
const Symbol = {
    ANCHOR :    'fa fa-anchor',
    BICYCLE :   'fa fa-bicycle',
    BOLT :      'fa fa-bolt',
    BOMB :      'fa fa-bomb',
    CUBE :      'fa fa-cube',
    DIAMOND :   'fa fa-diamond',
    LEAF :      'fa fa-leaf',
    PLANE :     'fa fa-paper-plane-o',    
}
//method freezes an object: that is, prevents new properties from being added to it; prevents existing properties from being removed
Object.freeze(Symbol);

//represents card's state:as if it is matched or opend or closed
const State = {
    CLOSED :    'card',
    OPENED :    'card open show',
    MATCHED :   'card open match',
}
//keep every thing
Object.freeze(State);


const Deck = {
    cards : [Symbol.ANCHOR, Symbol.ANCHOR, Symbol.BICYCLE, Symbol.BICYCLE, Symbol.BOLT, Symbol.BOLT, Symbol.BOMB, Symbol.BOMB, Symbol.CUBE, Symbol.CUBE, Symbol.DIAMOND, Symbol.DIAMOND, Symbol.LEAF, Symbol.LEAF, Symbol.PLANE, Symbol.PLANE],
    opened : [],
    matched : [],
    shuffle : (array) => {

        for (let i = array.length - 1; i > 0; --i) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        Rating.setCardsSymbols(array);
    },
    reset : () => {
        Deck.opened.length = 0;
        Deck.matched.length = 0;
        for (let i = 0; i < Deck.cards.length; i++) {
            Rating.closeCard(i);
        }
        Deck.shuffle(Deck.cards);
    },
    tryOpeningCard : ({index, symbol}) => {
        Deck.opened.push({index,symbol})
        Rating.openCard(index);
        
        if (Deck.opened.length === 2) { window.setTimeout(Deck.checkTheMatching, 200); } 
                       
    },
    checkTheMatching : () => {
        const c0 = Deck.opened[0];
        const c1 = Deck.opened[1];

        if (c0.symbol !== c1.symbol ) {
            Rating.closeCard(c0.index);
            Rating.closeCard(c1.index);
            Deck.opened.length = 0;
        } else {
            Rating.matchCard(c0.index);
             Rating.matchCard(c1.index);            
            Deck.matched.push(c0, c1);
            Deck.opened.length = 0;
        }
         // win condition
        if (Deck.matched.length === Deck.cards.length) {
            clearInterval(Timer);
            Rating.hideStartButton(false);
        }

    },
}
Object.freeze(Deck);
Object.seal(Deck.cards)

//Rating is a layer between model and view so all changes in DOM has be in ViewChanger class

class Rating {
    static setStars(numOfStars) {
        const d = document.getElementsByClassName("stars")[0];
        const starHTML = '<li><i class="fa fa-star"></i></li>';
        d.innerHTML = starHTML.repeat(numOfStars); 
    }

    static setMoves(numOfMoves) {
        const d = document.getElementsByClassName("moves")[0];
        d.innerHTML = numOfMoves;
    }
    static setTime(seconds) {
        const d = document.getElementsByClassName("timer")[0];
        d.innerHTML = seconds;
    }

    static openCard(cardIndex) {
        const d = document.getElementsByClassName("card");
        d[cardIndex].setAttribute("class", State.OPENED);
    }

    static closeCard(cardIndex) {
        const d = document.getElementsByClassName("card");
        d[cardIndex].setAttribute("class", State.CLOSED);
    }

    static matchCard(cardIndex) {
        const d = document.getElementsByClassName("card");
        d[cardIndex].setAttribute("class", State.MATCHED);
    }

    static setCardsSymbols(cards) {
        const d = document.getElementsByClassName("card");
        for (let i = 0; i < cards.length; i++) {
            d[i].firstChild.setAttribute("class", cards[i]);
        }
    }

    static hideStartButton(bool) {
        const d = document.getElementsByClassName("modal")[0];
        if (bool === true) {
            d.innerHTML = `Ready to Play? <br><br>
            3 stars &lt; 30 moves <br>
            2 stars &lt; 40 moves <br>
            1 star  &gt;= 40 moves<br><br> 
            Click to Play`;
            d.className = "modal hide";
        } else {
            d.innerHTML = `Congratulation! <br><br> Total Time Taken: ${ScorePanel.time} <br> Star Rating: ${ScorePanel.star} <br> Total Moves: ${ScorePanel.move}  <br><br> Click to Restart`;
            d.className = "modal show";
        }
    }

}

//methods for user's actions
class EventListener {
    static setClickToStart() {
        const d = document.getElementsByClassName('modal')[0];
        d.addEventListener("click", EventHandler.clickToStart);
    }

    static setClickToRestart() {
        const d = document.getElementsByClassName('restart')[0];
        d.addEventListener("click", EventHandler.clickToRestart);
    }

    static setClickCards() {
        
        const d = document.getElementsByClassName("deck")[0];
        
        d.addEventListener("click", (e) => {
            const state = e.target.className;
            console.log(state);
            if (state === State.CLOSED) {
                EventHandler.clickCard(e);
            }
        });
    }
}

//has a event handler methods for user's action.
class EventHandler {
    static clickCard(e) {

        const index = e.target.id;
        const state = e.target.className;
        const symbol = e.target.firstChild.className;

        ScorePanel.incrementMove();
        Deck.tryOpeningCard({index, symbol});
        
    }
    static clickToRestart() {

        Deck.reset();
        ScorePanel.reset();
    }

    static clickToStart(e) {
        
        Deck.reset();
        ScorePanel.reset();
        Timer = setInterval(ScorePanel.incrementTime, 1000);
        Rating.hideStartButton(true);

    }
}

function starting() {
   
    EventListener.setClickToStart();
    EventListener.setClickToRestart();
    EventListener.setClickCards();

}

starting();


