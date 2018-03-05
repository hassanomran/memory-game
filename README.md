# Memory Game Project

The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match!
Each turn:

1. The player flips one card over to reveal its underlying symbol.
2. The player then turns over a second card, trying to find the corresponding card with the same symbol.
3. If the cards match, both cards stay flipped over.
4. If the cards do not match, both cards are flipped face down.

## Game Functionality
The real-life game, players flip over cards to locate the pairs that match The goal is to recreate this effect in your project. There are a couple of interactions that you'll need to handle:
1. Flipping cards
2. What happens when cards match
3. What happens when cards do not match
4. When the game finishes

#### Interactivity Guideline
Keep in mind that the specific functionality demonstrated here (e.g. a card performs a horizontal flip when clicked) is an example. You do not need to have this exact functionality.

### Development Strategy
It's very important that you plan your project before you start writing any code. Break your project down into *small* pieces of work and plan out your approach to each one. It's much easier to debug and fix an issue if you've only made a small change. It becomes much harder if you wait longer to test your code. You don't build a house all at once, but brick by brick.

1. Start by building a very simple grid of cards.
2.  Don't worry about styling, just get something clickable on the page.
3. Figure out the HTML needed to represent a card. Remember, you have to represent two sides of the card. Are you going to have two
###separate elements stacked on top of each other?
1. Add the functionality to handle clicks.
2. This should reveal the hidden side of each card.
3. Work on the matching logic. How does your game "know" if a player guesses correctly or incorrectly?
4. Work on the winning condition. How does your game “know” if a player has won?
5 We recommend saving styling until the very end. Allow your game logic and functionality to dictate the styling.
