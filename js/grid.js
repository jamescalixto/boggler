/*
Utility functions relating to grid generation and words.
*/


// Equivalent to Python Counter.
function Counter() {
    this.vals = {};
    this.add = (val) => {
        this["vals"][val] = (this["vals"][val] || 0) + 1;
    };
    this.update = (array) => {
        array.forEach((val) => this.add(val));
    };
    this.combine = (counter) => {
        for (let key in counter["vals"]) {
            this["vals"][key] = (this["vals"][key] || 0) + counter["vals"][key];
        }
    }
}


// Build trie from wordlist.
function buildTrie(wordlist) {
    let trie = {};
    for (let word of wordlist) {
        let node = trie;
        for (let letter of word) {
            if (!(letter in node)) {
                node[letter] = {};
            }
            node = node[letter];
        }
        node['$end'] = true;
    }
    return trie;
}


// Build adjacency array, given the total length.
function buildAdjacency(len) {
    let n = Math.sqrt(len);
    let adjacency = {};
    // This is inefficient but computers are fast!
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let tempAdjacency = [];
            for (let q of [-1, 0, 1]) {
                for (let r of [-1, 0, 1]) {
                    if (i+q >= 0 && i+q < n && j+r >= 0 && j+r < n && (q != 0 || r != 0)) {
                        tempAdjacency.push((i+q)*n + j+r);
                    }
                }
            }
            adjacency[(i*n) + j] = tempAdjacency;
        }
    }
    return adjacency;
}


// Given a set of dice and a seed, generate grid.
// Return an array of letters, NxN long.
function generateGrid(diceSet, seed) {
    let rng = new alea(seed);
    grid = shuffleArray(diceSet, rng).map((side) => sample(side, rng));
    return grid;
}


// Filter wordlist to words in the grid.
function getWordsInGrid(grid, wordlist, trie, adjacency) {
    let foundWords = new Set()
    for (let start = 0; start < grid.length; start++) {
        foundWords = foundWords.union(getWordsInGridRecursive(grid, wordlist, trie, adjacency, [start]));
    }
    return foundWords;
}

// Given a lot of information about the grid, get every word that's found in it.
function getWordsInGridRecursive(grid, wordlist, trie, adjacency, visited) {
    let trieCur = trie;
    let foundWords = new Set();
    
    // Navigate the trie until we get to where we are.
    for (let v of visited) {
        for (let ltr of grid[v]) {
            if (!(ltr.toUpperCase() in trieCur)) {
                return foundWords;  // required for bigram cases.
            }
            trieCur = trieCur[ltr.toUpperCase()];
        }
    }
    // If we've reached a dead end, return.
    if (trieCur === undefined) {
        return foundWords;
    }
    // If we're at the end of a word in the trie, add it to our found words.
    if ('$end' in trieCur) {
        foundWords.add(visited.map((v) => grid[v].toUpperCase()).join(''));
    }
    // If we have no more options, return.
    if (Object.keys(trieCur).length == 0) {
        return foundWords;
    }
    // Otherwise, iterate over neighbors and recurse, making sure not to revisit.
    for (let adj of adjacency[visited[visited.length-1]]) {
        if (!visited.includes(adj)) {
            newVisited = [...visited, adj];
            foundWords = new Set([...foundWords, ...getWordsInGridRecursive(grid, wordlist, trie, adjacency, newVisited)]);
        }
    }
    return foundWords;
}


// Build heatmap array of the letters in grid.
function buildHeatmap(grid, wordlist, trie, adjacency) {
    let heatmap = new Counter();
    for (let start = 0; start < grid.length; start++) {
        heatmap.combine(buildHeatmapRecursive(grid, wordlist, trie, adjacency, [start]));
    }
    return heatmap;
}


// Given a lot of information about the grid, build a heatmap.
function buildHeatmapRecursive(grid, wordlist, trie, adjacency, visited) {
    let trieCur = trie;
    let heatmap = new Counter();
    
    // Navigate the trie until we get to where we are.
    for (let v of visited) {
        for (let ltr of grid[v]) {
            if (!(ltr.toUpperCase() in trieCur)) {
                return heatmap;  // required for bigram cases.
            }
            trieCur = trieCur[ltr.toUpperCase()];
        }
    }
    // If we've reached a dead end, return.
    if (trieCur === undefined) {
        return heatmap;
    }
    // If we're at the end of a word in the trie, add it to our found words.
    if ('$end' in trieCur) {
        heatmap.update(visited);
    }
    // If we have no more options, return.
    if (Object.keys(trieCur).length == 0) {
        return heatmap;
    }
    // Otherwise, iterate over neighbors and recurse, making sure not to revisit.
    for (let adj of adjacency[visited[visited.length-1]]) {
        if (!visited.includes(adj)) {
            newVisited = [...visited, adj];
            heatmap.combine(buildHeatmapRecursive(grid, wordlist, trie, adjacency, newVisited));
        }
    }
    return heatmap;

}