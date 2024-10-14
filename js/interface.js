// Store variables.
var global_canEnterWords = false;
var global_gameTimer;
var global_gameTick;
var global_grid;
var global_words;
var global_foundWords;


// Helper function.
function element(el) {
    return document.getElementById(el);
}

// Left pad with three zeroes.
function lpad(i) {
    return String(i).padStart(3, '0');
}

// Done or new game setup.
function setUpDoneOrNew() {
    var ng = document.getElementById("button-new-game");
    if (global_canEnterWords) { // game in progress - end game.
        ng.innerText = "end";
        ng.addEventListener("click", () => reveal());
    } else { // game is over - new game.
        ng.innerText = "new";
        ng.addEventListener("click", () => newGame(global_wordlist));
    }
}

// Reset clock.
function resetClock() {
    let holder = element("container-timer");
    holder.innerText = lpad(TIMER_LENGTH);
}

// End clock.
function endClock() {
    window.clearInterval(global_gameTick);
    let holder = element("container-timer");
    holder.innerText = lpad(0);
}

// Tick the clock.
function tickClock() {
    let holder = element("container-timer");
    if (parseInt(holder.innerText) === 0) {
        holder.innerText = lpad(TIMER_LENGTH);
    } else {
        holder.innerText = lpad(Math.max(0, holder.innerText - 1));
    }
    if (parseInt(holder.innerText) === 0) {
        window.clearInterval(global_gameTick);
    }
}

// Allow or disallow input.
function toggleInput(state=null) {
    if (state === null) {
        global_canEnterWords = !global_canEnterWords;
    } else {
        global_canEnterWords = state;
    }
    if (global_canEnterWords) {
        element("input-display").classList.remove("hidden");
    } else {
        element("input-display").classList.add("hidden");
    }
}

// Test if a key is a letter.
function isLetter(key) {
    return (
        key.length == 1 && "ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(key.toUpperCase())
    );
}


// Add letter to entry.
function addLetterEntry(letter) {
    let holder = element("input-display");
    holder.innerText += letter.toUpperCase();
}

// Remove letter from entry.
function removeLetterEntry() {
    let holder = element("input-display");
    if (holder.innerText.length > 0) {
        holder.innerText = holder.innerText.slice(0, -1);
    }
}

// Enter word.
function enterWord() {
    let holder = element("input-display");
    let word = holder.innerText;
    if (word.length > 0) {
        if (global_foundWords.has(word)) {
            displayMessage("already found!", false);
        } else if (!global_words.has(word)) {
            displayMessage("not a valid word!", false);
        } else {
            displayMessage(congratulateWord(word));
            enterWordInterface(word);
        }
        holder.innerText = "";
    }
}

// Add word to interface.
function enterWordInterface(word, gray=false) {
    let answers = element("container-answers");
    newAnswer = document.createElement("span");
    newAnswer.className = "answer";
    newAnswer.innerText = `${word} (${scoreWord(global_grid, word)})`;
    if (gray) {
        newAnswer.classList.add("text-gray");
    }
    answers.appendChild(newAnswer);
    global_foundWords.add(word);
}


// Display message.
function displayMessage(message, good=true) {
    let holder = element("container-notifications");
    holder.innerText = message;
    void element.offsetHeight;
    holder.style.animation = null;
    holder.offsetHeight;
    if (good) {
        holder.style.animation = "flashgreen 0.5s";
    } else {
        holder.style.animation = "flashred 0.5s";
    }
}

// Set up keyboard input function.
function setUpKeyboardInput() {
    document.addEventListener("keydown", function (e) {
        // Only input letters or recognize backspaces and enter keys.
        // Don't recognize it when popups or dropdown are active.
        if (global_canEnterWords) {
            if (isLetter(e.key)) {
                event.preventDefault();
                addLetterEntry(e.key);
            } else if (e.key == "Backspace") {
                event.preventDefault();
                removeLetterEntry();
            } else if (e.key == "Enter") {
                event.preventDefault();
                enterWord();
            } else {
                event.preventDefault();
            }
        }
    });
  }


// Build grid.
// Assume letters is a valid NxN array of letters.
function buildGrid(letters) {
    let sideLength = Math.sqrt(letters.length);

    // Create letters.
    let lettersElements = letters.map((letter) => {
        let div = document.createElement("div");
        div.classList.add("grid-letter");
        div.textContent = letter;
        return div;
    })

    // Replace grid contents.
    let grid = document.getElementById("container-grid");
    grid.replaceChildren(...lettersElements);
}


// Reveal.
function reveal() {
    endClock();
    clearTimeout(global_gameTimer);
    clearInterval(global_gameTick);
    toggleInput(false);
    for (let word of global_words) {
        if (!global_foundWords.has(word)) {
            enterWordInterface(word, true);
        }
    }
    displayMessage("time's up!");
    setUpDoneOrNew();
}


// Start new game.
function newGameInterface(letters) {
    displayMessage("new game..."); // clear messages.
    global_foundWords = new Set(); // clear found words.
    element("container-answers").replaceChildren(); // clear answers.
    clearTimeout(global_gameTimer);
    clearInterval(global_gameTick);
    global_gameTimer = setTimeout(reveal, TIMER_LENGTH*S_TO_MS); // start timer.
    resetClock(); // reset clock.
    global_gameTick = setInterval(tickClock, S_TO_MS); // tick timer.
    buildGrid(letters); // build interface.
    toggleInput(true) // allow input.
    setUpDoneOrNew();
}