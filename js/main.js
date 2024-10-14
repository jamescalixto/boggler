var global_wordlist;
var global_trie;

// Return a random sample of an array.
function sample(arr, rng) {
    return arr[Math.floor(rng() * arr.length)];
}


// Shuffle an array and return it.
function shuffleArray(arr, rng) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(rng() * i);
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

// Set up elements.
function setUp(wordlist) {
    global_wordlist = wordlist;
    global_trie = buildTrie(wordlist);
    setUpKeyboardInput();
    newGame(wordlist);
}

// Start a new game.
function newGame(wordlist) {
    let grid = generateGrid(DICE_SETS["Boggle Deluxe (5x5)"], Date.now());
    global_grid = grid;
    adjacency = buildAdjacency(grid.length);
    words = getWordsInGrid(grid, wordlist, global_trie, adjacency);
    global_words = words;
    heatmap = buildHeatmap(grid, wordlist, global_trie, adjacency);
    newGameInterface(grid);
}

// End the current game.
function endGame() {
    // Disable input.
    // Show the results.
}