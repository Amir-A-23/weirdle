const tileDisplay = document.querySelector('.tile-container');
const keyboard = document.querySelector('.key-container');
const messageDisplay = document.querySelector('.message-container');

//let weirdle = 'SUPER';

const getWierdle = () => {
	fetch('https://weirdle-2022.herokuapp.com/word')
		.then((response) => response.json())
		.then((json) => {
			console.log(json);
			weirdle = json.toUpperCase();
		})
		.catch((err) => console.log(err));
};

getWierdle();
const keys = [
	'Q',
	'W',
	'E',
	'R',
	'T',
	'Y',
	'U',
	'I',
	'O',
	'P',
	'A',
	'S',
	'D',
	'F',
	'G',
	'H',
	'J',
	'K',
	'L',
	'ENTER',
	'Z',
	'X',
	'C',
	'V',
	'B',
	'N',
	'M',
	'«',
];

const guessRows = [
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', ''],
];

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

guessRows.forEach((guessRow, guessRowIndex) => {
	const rowElement = document.createElement('div');
	rowElement.setAttribute('id', 'guessRow-' + guessRowIndex);
	guessRow.forEach((guess, guessIndex) => {
		const tileElement = document.createElement('div');
		tileElement.setAttribute(
			'id',
			'guessRow-' + guessRowIndex + '-tile-' + guessIndex,
		);
		tileElement.classList.add('tile');
		rowElement.append(tileElement);
	});
	tileDisplay.append(rowElement);
});

keys.forEach((key) => {
	const buttonElement = document.createElement('button');
	buttonElement.textContent = key;
	buttonElement.setAttribute('id', key);
	buttonElement.addEventListener('click', () => handleClick(key));
	keyboard.append(buttonElement);
});

const handleClick = (letter) => {
	if (!isGameOver) {
		console.log('clicked', letter);
		if (letter === '«') {
			deleteLetter();
			return;
		}
		if (letter === 'ENTER') {
			checkRow();
			return;
		}
		addLetter(letter);
	}
};

const addLetter = (letter) => {
	if (currentTile < 5 && currentRow < 6) {
		const tile = document.getElementById(
			'guessRow-' + currentRow + '-tile-' + currentTile,
		);
		tile.textContent = letter;
		guessRows[currentRow][currentTile] = letter;
		tile.setAttribute('data', letter);
		currentTile++;
	}
};

const deleteLetter = () => {
	if (currentTile > 0) {
		currentTile--;
		const tile = document.getElementById(
			'guessRow-' + currentRow + '-tile-' + currentTile,
		);
		tile.textContent = '';
		guessRows[currentRow][currentTile] = '';
		tile.setAttribute('data', '');
	}
};

const checkRow = () => {
	const guess = guessRows[currentRow].join('');
	console.log('guess', guess);
	if (currentTile > 4) {
		fetch('https://weirdle-2022.herokuapp.com/check/?word=${guess}')
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				if (json == 'Entry word not found') {
					showMessage('word not in list');
					return;
				} else {
					flipTile();
					if (weirdle == guess) {
						showMessage('Magnificent!');
						isGameOver = true;
						return;
					} else {
						if (currentRow >= 5) {
							isGameOver = true;
							showMessage('Game Over');
							return;
						}
						if (currentRow < 5) {
							currentRow++;
							currentTile = 0;
						}
					}
				}
			})
			.catch((err) => console.log(err));
	}
};

const showMessage = (message) => {
	const messageElement = document.createElement('p');
	messageElement.textContent = message;
	messageDisplay.append(messageElement);
	setTimeout(() => messageDisplay.removeChild(messageElement), 2000);
};
const addColorToKey = (keyletter, color) => {
	const key = document.getElementById(keyletter);
	key.classList.add(color);
};

const flipTile = () => {
	const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes;
	let checkWeirdle = weirdle;
	const guess = [];

	rowTiles.forEach((tile) => {
		guess.push({ letter: tile.getAttribute('data'), color: 'grey-overlay' });
	});

	guess.forEach((guess, index) => {
		if (guess.letter == weirdle[index]) {
			guess.color = 'green-overlay';
			checkWeirdle = checkWeirdle.replace(guess.letter, '');
		}
	});

	guess.forEach((guess) => {
		if (checkWeirdle.includes(guess.letter)) {
			guess.color = 'yellow-overlay';
			checkWeirdle = checkWeirdle.replace(guess.letter, '');
		}
	});

	rowTiles.forEach((tile, index) => {
		setTimeout(() => {
			tile.classList.add('flip');
			tile.classList.add(guess[index].color);
			addColorToKey(guess[index].letter, guess[index].color);
		}, 500 * index);
	});
};
