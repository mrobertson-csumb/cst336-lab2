const words = [
    {word: 'snake', hint: 'a reptile'},
    {word: 'monkey', hint: 'a mammal'},
    {word: 'beetle', hint: 'an insect'}];

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let board = [];

let selectedWord = "";
let selectedHint = "";
const totalGuesses = 6;
let remainingGuesses = totalGuesses;

/* listeners */
window.onload = startGame();


$('.letter').click(function () {
    checkLetter($(this).attr('id'));
    disableButton($(this))
});

$('.replayBtn').click(function () {
    location.reload();
});

$('#btn_show_hint').click(function () {
    $('#btn_show_hint').hide();
    $('#txt_hint').show();
    remainingGuesses--;
    updateMan()
});

function startGame() {
    pickWord();
    initBoard();
    updateBoard();
    createLetters();
}

/**
 * selects a random word
 */
function pickWord() {
    const randomInt = Math.floor(Math.random() * words.length);
    selectedWord = words[randomInt].word.toUpperCase();
    selectedHint = words[randomInt].hint;
    /*todo just return the word instead of setting selected word value */
}

/**
 * fills the board with underscores
 */
function initBoard() {
    for (let letter in selectedWord) {
        board.push('_')
    }
    $('#txt_hint').append(hintAsSpan(selectedHint))

}

/**
 * updates the board
 */
function updateBoard() {
    $('#word').empty(); // clear it

    for (let letter of board) {
        $('#word').append(letter + ' ');
    }


}

function createLetters() {
    for (let letter of alphabet) {
        $('#letters').append(letterAsButton(letter))
    }
}

function hintAsSpan(hint) {
    return `<span>hint: </span><strong>${hint}</strong>`;

}

function disableButton(btn) {
    btn.prop('disabled', true);
    btn.attr('class', "btn btn-danger")
}

function letterAsButton(letter) {
    return `<button class="letter" id="${letter}">${letter}</button>`;
}

/**
 * checks to see if the selected letter is in the selectedWord
 * @param letter
 */
function checkLetter(letter) {
    let positions = [];

    for (let i = 0; i < selectedWord.length; i++) {
        if (letter === selectedWord[i]) {
            positions.push(i);
        }
    }

    if (positions.length > 0) {
        updateWord(positions, letter);
        if (!board.includes('_')) {
            endGame(true);
        }
    } else {
        remainingGuesses--;
        updateMan();
    }

    if (remainingGuesses <= 0) {
        endGame(false);
    }


}

/**
 * updates the current word then calls for a board update
 * @param positions
 * @param letter
 */
function updateWord(positions, letter) {
    for (let pos of positions) {
        board[pos] = letter;
    }
    updateBoard();

}


function updateMan() {
    $('#hangImg').attr('src', 'img/stick_' + (totalGuesses - remainingGuesses) + '.png')
}


function endGame(isWin) {
    $('#letters').hide();
    if (isWin) {
        $('#won').show();
    } else {
        $('#lost').show();
    }

}
