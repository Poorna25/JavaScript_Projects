let min = 1,
    max = 10,
    winningNum = Math.floor(Math.random() * 10) + 1,
    guessesLeft = 3;

const inputValue = document.querySelector('#guess-input'),
    inputBtn = document.querySelector('#guess-btn'),
    message = document.querySelector('.message'),
    game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num');

minNum.textContent = min;
maxNum.textContent = max;

inputBtn.addEventListener('click', guessNumber);

function guessNumber() {
    console.log(winningNum);
    let guess = parseInt(inputValue.value);
    let fixGuess = guess;

    if (isNaN(guess) || guess < min || guess > max) {
        inputValue.value = '';
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }
    else {
        inputValue.value = '';
        guessesLeft = guessesLeft - 1;
        inputValue.style.borderColor = 'red';
        setMessage(`${guess} is wrong, You have ${guessesLeft} guesses left!`, 'red');
        if (guessesLeft == 0) {
            gameOver(false, `You Lost! The correct number is ${winningNum}`, fixGuess);
        }
    }

    if (guess === winningNum) {
        inputValue.style.borderColor = 'green';
        gameOver(true, `${winningNum} is correct. You Win!`, fixGuess);
        inputBtn.addEventListener('click', reloadPage);
    }
}

function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

function gameOver(won, msg, fGuess) {
    inputValue.value = fGuess;
    let color;
    won == true ? color = 'green' : color = 'red';
    inputValue.disabled = true;
    setMessage(msg, color);
    inputBtn.removeEventListener('click', guessNumber);
    inputBtn.value = 'Play Again';
}

function reloadPage() {
    location.reload();
}