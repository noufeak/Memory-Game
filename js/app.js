/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const cards = document.querySelectorAll('.card');
const moves = document.querySelector('.moves');
const stars = document.querySelector('.stars')
const dialog = document.querySelector('#dialogBox');
const timer = document.querySelector('.timer');

//Array holding each card iccon
let cardIcon = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf',
 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf',
  'fa fa-bicycle', 'fa fa-bomb'];

let movesCounter = 0;
let cardsClicked = [];
let second = 0;
let minute = 0;
let interval = null;
let starsConter = 3;

cards.forEach(card => card.addEventListener('click', showCards));
//Restarting the game after clicking
document.querySelector('.restart').addEventListener('click', startGame);

//Create child for each card
function createNewElement() {
  let i;
  for (let c = 0; c<cards.length; c++){
    i = document.createElement('i');
    cards[c].appendChild(i);
  }
}

//Give an icon for each card
function createCardIcon(){
  cardIcon = shuffle(cardIcon);
  for (let c = 0; c<cards.length; c++){
    let i = cards[c].children[0];
    i.className = cardIcon[c];
  }
}

function startGame() {

  closeDialog();

  createCardIcon()

  cardsClicked = [];
  second = 0;
  minute = 0;
  movesCounter = 0;
  moves.innerText = '0';
  starsConter = 3;
  //make the stras visible
  for(let i=0; i<2; i++){
    stars.children[i].style.visibility = 'visible';
  }

  cards.forEach(card => card.classList.remove('show', 'open', 'match', 'disable'));

  timer.innerHTML= `${minute}:${second}`;

  startTimer();
}
//Flip two cards up
function showCards() {
  if (cardsClicked.length < 2){
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disable');
    cardsClicked.push(this);

    if (cardsClicked.length == 2){
      setTimeout(compareTwoCards, 1000);
    }
  }
}

function compareTwoCards(){
  let firstCard = cardsClicked[0];
  let secondCard = cardsClicked[1];
  let firstCardChild = firstCard.children[0].className;
  let secondCardChild = secondCard.children[0].className;

  if(firstCardChild == secondCardChild){
    matched(firstCard,secondCard);
  } else {
    unmatched(firstCard,secondCard);
  }
  cardsClicked = [];
  incrementMove();
  //Figure out if there are remaining cards not opened yet
  const remainingUnopendCards = document.querySelectorAll('.card:not(.match)');
  if (remainingUnopendCards.length == 0){
    //call winning dialog
    winning();
  }
}

//insert match class into the matched cards
function matched(f,s){
      f.classList.add('match');
      s.classList.add('match');
      f.classList.remove('open', 'show');
      s.classList.remove('open', 'show');
}

//flip unmatched cards down
function unmatched(f,s){
  f.className = 'card';
  s.className = 'card';
}

function incrementMove(){
  movesCounter++;
  moves.innerText = movesCounter;
  //if the moves less than 10 then stras will be 3
  //moves between 10 && 15, stras = 2
  //otherwise one star will remain
  if (movesCounter < 10){
    stars.children[0].style.visibility= 'visible';
    starsConter = 3;
  } else if (movesCounter < 15) {
    stars.children[0].style.visibility= 'hidden';
    starsConter = 2;
  } else {
    stars.children[1].style.visibility= 'hidden';
    starsConter = 1;
    }
}

function startTimer(){
  if(!interval){
    interval = setInterval(function(){
      timer.innerHTML= `${minute}:${second}`;
      second++;
      if (second > 59){
        minute++;
        second = 0;
      }
    }, 1000);
  }
}

function stopTimer(){
  clearInterval(interval);
  interval = null;
}

function winning(){
  stopTimer();
  let timeToken = timer.innerHTML;
  const starsNumber = document.querySelector('.stars').innerHTML;

  document.querySelector('#timeToken').innerHTML= `Time you took to solve is: ${timeToken}`;
  //document.querySelector('#numOfStars').innerHTML= `And you got ${starsNumber} star`;
  document.getElementById('numOfmoves').innerHTML= movesCounter;
  document.getElementById('numOfStars').innerHTML= starsNumber;
  dialog.showModal();
}

function playAgain(){
  startGame();
}

function closeDialog(){
  document.querySelector('#dialogBox').close();
}

createNewElement();
startGame();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
