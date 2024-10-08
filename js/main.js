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
    setUpKeyboardInput();
    newGame(wordlist);
}

// Start a new game.
function newGame(wordlist) {
    let trie = buildTrie(wordlist);
    let grid = generateGrid(DICE_SETS["Boggle Deluxe (5x5)"], Date.now());
    adjacency = buildAdjacency(grid.length);

    words = getWordsInGrid(grid, wordlist, trie, adjacency);
    console.log(words);

    heatmap = buildHeatmap(grid, wordlist, trie, adjacency);
    console.log(heatmap.vals);

    buildGrid(grid);
}