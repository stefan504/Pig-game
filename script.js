'use strict';

let score0El = document.getElementById('score--0');
let score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
let current0 = document.querySelector('#current--0');
let current1 = document.querySelector('#current--1');

let switchFunction = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

let totalScores, currentScore, activePlayer, playing;
// STARTING CONDITIONS

const init = function () {
  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();
// ROLLING DICE
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.Generate random number 1-6
    let randomNumber = Math.trunc(Math.random() * 6) + 1;
    //   2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomNumber}.png`;

    //   3.Check for rolled 1: if true, switch to next player.
    if (randomNumber == 1) {
      switchFunction();
    }

    //   WHEN DICE IS NOT ONE
    else {
      currentScore += randomNumber;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    }
  }
});

// HOLD BUTTON

btnHold.addEventListener('click', function () {
  if (playing) {
    totalScores[activePlayer] += currentScore;

    // ADD CURRENT SCORE TO ACTIVE PLAYER
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    // SWITCH PLAYER
    //   CHECK IF SCORE > 100;
    if (totalScores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchFunction();
    }
  }
});

// RESETING THE GAME
btnNew.addEventListener('click', init);
