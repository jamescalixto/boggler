// Word scoring function.
function scoreWord(grid, word) {
    if (grid.length < 25) {
        if (word.length < 3) {
            return 0;
        } else if (word.length == 3 || word.length == 4) {
            return 1; 
        } else if (word.length == 5) {
            return 2;
        } else if (word.length == 6) {
            return 3;
        } else if (word.length == 7) {
            return 5;
        } else {
            return 11;
        }
    } else {
        if (word.length < 4) {
            return 0;
        } else if (word.length == 4) {
            return 1; 
        } else if (word.length == 5) {
            return 2;
        } else if (word.length == 6) {
            return 3;
        } else if (word.length == 7) {
            return 5;
        } else {
            return 11;
        }
    }
}

// Underlined letters.
UNDERLINED = ["M", "W", "Z"];

// Vowels.
VOWELS = ["A", "E", "I", "O", "U"];

// Map of dice sets.
DICE_SETS = {
    // https://boardgamegeek.com/thread/300565/review-from-a-boggle-veteran-and-beware-different
    "Boggle (4x4)": [
        ["A","A","E","E","G","N"],
        ["E","L","R","T","T","Y"],
        ["A","O","O","T","T","W"],
        ["A","B","B","J","O","O"],
        ["E","H","R","T","V","W"],
        ["C","I","M","O","T","U"],
        ["D","I","S","T","T","Y"],
        ["E","I","O","S","S","T"],
        ["D","E","L","R","V","Y"],
        ["A","C","H","O","P","S"],
        ["H","I","M","N","Q","U"],
        ["E","E","I","N","S","U"],
        ["E","E","G","H","N","W"],
        ["A","F","F","K","P","S"],
        ["H","L","N","N","R","Z"],
        ["D","E","I","L","R","X"]
    ],
    // https://boardgamegeek.com/thread/300883/letter-distribution
    "Boggle Deluxe (5x5)": [
        ["A","A","A","F","R","S"],
        ["A","A","E","E","E","E"],
        ["A","A","F","I","R","S"],
        ["A","D","E","N","N","N"],
        ["A","E","E","E","E","M"],
        ["A","E","E","G","M","U"],
        ["A","E","G","M","N","N"],
        ["A","F","I","R","S","Y"],
        // ["B","J","K","Qu","X","Z"],
        ["Er","Es","Et","Qu","Ar","In"],
        ["C","C","E","N","S","T"],
        ["C","E","I","I","L","T"],
        ["C","E","I","L","P","T"],
        ["C","E","I","P","S","T"],
        ["D","D","H","N","O","T"],
        ["D","H","H","L","O","R"],
        ["D","H","L","N","O","R"],
        ["D","H","L","N","O","R"],
        ["E","I","I","I","T","T"],
        ["E","M","O","T","T","T"],
        ["E","N","S","S","S","U"],
        ["F","I","P","R","S","Y"],
        ["G","O","R","R","V","W"],
        ["I","P","R","R","R","Y"],
        ["N","O","O","T","U","W"],
        ["O","O","O","T","T","U"]
    ]
}