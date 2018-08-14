getId = function (params) {
    return document.getElementById(params);
};

Array.prototype.indicesOf = function (x) {
    return this.reduce((p, c, i) => c === x ? p.concat(i) : p, []);
};

let guessRandomWord, arrOfWords, checkIndexes, arr = [], nestedArrOfWords = [], arrOfSameLength = [], hintArr = [], wordCheckingArr = [], mia = [], some = [], arrForResults = [], chars = '', count = 6, points, warning = 3, winning = 0, guessWordLength = 0, alphabetArray = "abcdefghijklmnopqrstuvwxyz".split(""), userVal = getId("txt"),

print = getId("ammountOfLetters");
charsLeft = getId("guess");
printChar = getId("ammountOfChars");
printletters = getId("letters");
printWarning = getId("warning");
printMessage = getId("message");
printErr = getId("error");

readFile = function () {
    $.get('words.txt', function (data) {
        arr = data.split('\n');
        //console.log(arr);
    });
}

selectWord = () => {
    arrOfWords = arr.join(" ").split(" ");
    console.log("arrOfWords ", arrOfWords);
    chars = '';
    guessRandomWord = arrOfWords[Math.floor(Math.random() * arrOfWords.length - 1)].split('');
    points = [...new Set(guessRandomWord)].length;
    guessWordLength = guessRandomWord.length;
    print.textContent = `I am thinking of a word that is ${guessWordLength} letters long.`;
    charsLeft.textContent = `You have 6 guesses left`;
    printletters.textContent = `Here are the letters left: ${alphabetArray}`;
    printWarning.textContent = ``;
    //hint();
    for (let i = 0; i < guessWordLength; i++) {
        chars += "*";
    }
    printChar.textContent = chars;
    console.log(guessRandomWord);
}

checkingInputValue = () => {
    let letters = /^[A-Za-z]+$/;
    if (!userVal.value.match(letters)) {
        warning -= 1;
        printWarning.textContent = `Oops! That is not a valid letter. You have ${warning} warnings left.`;
        gameOver();
    } else if (alphabetArray.includes(userVal.value.toLowerCase())) {
        getInpVal();
        console.log("alphabetArray ", alphabetArray, "userVal.value.toLowerCase()", userVal.value.toLowerCase());
        gameOver();
    } else {
        warning -= 1;
        printWarning.textContent = `Oops! You've already guessed that letter. You have ${warning} warnings left.`;
        gameOver();
    }
}

getInpVal = () => {
    let sum = 0, been = false;
    for (let i = 0; i < guessWordLength; i++) {
        if (userVal.value === guessRandomWord[i]) {
            chars = chars.substr(0, i) + userVal.value.toLowerCase() + chars.substr(i + 1);
            printChar.textContent = chars;
            printMessage.textContent = `Good guess`;
            been = true;
            sum = 0;
            winning += 1;
            console.log("alphabetArray", alphabetArray);
        } else {
            sum = 1;
        }
    }
    if (been == false) {
        count -= sum;
        printMessage.textContent = `Oops! That letter is not in my word.`;
    }
    if (winning === guessWordLength) {
        alert(`Congratulations, you won. Your score is ${count * points}`);
        location.reload();
    }
    alphabetArray.splice(alphabetArray.indexOf(userVal.value.toLowerCase()), 1);
    printletters.textContent = `Here are the letters left: ${alphabetArray}`;
    been = false;
    userVal.value = '';
    charsLeft.textContent = `You have ${count} guesses left`;
    printChar.textContent = chars;
    console.log(`chars `, chars);
    wordCheckingArr.length = 0;
    wordCheckingArr = chars.split("");
    console.log("wordCheckingArr ", wordCheckingArr);
    //console.log("jj ", jj);
    some = wordCheckingArr.indicesOf("*");
    getIndexesOfGuessedCharacters();
    console.log("some ", some);
}

hint = () => {
    nestedArrOfWords = [];
    arrOfSameLength = [];
    hintArr = [];
    let j, ok;
    for (let i = 0; i < arrOfWords.length; i++) {
        nestedArrOfWords.push(arrOfWords[i].split(''));
    }
    for (let i = 0; i < nestedArrOfWords.length; i++) {
        if (guessRandomWord.length === nestedArrOfWords[i].length)
            arrOfSameLength.push(nestedArrOfWords[i]);
    }
    for (let i = 0; i < arrOfSameLength.length; i++) {
        for (j = 0; j < wordCheckingArr.length; j++) {
            ok= false;
           if (wordCheckingArr[j] === "*") {
               ok = true;
               continue;
           } else if (wordCheckingArr[j] !== "*" && wordCheckingArr[j] !== arrOfSameLength[i][j]) {
               ok=false;
               break;
           } else {
               ok = true;
           }
                   
        }
        if (j === arrOfSameLength[0].length - 1 && ok === true) {
            arrForResults.push(arrOfSameLength[j]);
            console.log("from if ", arrForResults);
        }
                
    }
         
    console.log(`nestedArrOfWords`, nestedArrOfWords);
    console.log("arrOfSameLength ", arrOfSameLength);
    console.log("arrForResults ", arrForResults);
}

gameOver = () => {
    if (count < 0 || warning < 0) {
        alert(`Game over, you lost, the word is - ${guessRandomWord.join().replace(/,/g, '')}`);
        location.reload();
    }
}