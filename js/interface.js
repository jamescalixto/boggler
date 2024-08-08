// Helper function.
function element(el) {
    return document.getElementById(el);
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
        let answers = element("container-answers");
        answers.innerText += ` ${word}`;
        holder.innerText = "";
    }
}


// Set up keyboard input function.
function setUpKeyboardInput() {
    document.addEventListener("keydown", function (e) {
        // Only input letters or recognize backspaces and enter keys.
        // Don't recognize it when popups or dropdown are active.
        if (true) {
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