getId = function (params) {
    return document.getElementById(params);
};

Array.prototype.indicesOf = function (x) {
    return this.reduce((p, c, i) => c === x ? p.concat(i) : p, []);
};

let randomWord, arrWord, checkIndexes, arr = [], changedArr = [], anotherArr = [], hintArr = [], checkingArr = [], mia = [], some = [], gugo = [], chars = '', count = 6, warning = 3, winning = 0, wordLength = 0, alphaArray = "abcdefghijklmnopqrstuvwxyz".split(""), userVal = getId("txt"),

    print = getId("ammountOfLetters");
wordsLeft = getId("guess");
printChar = getId("ammountOfChars");
printletters = getId("letters");
printWarning = getId("warning");
printMessage = getId("message");
printErr = getId("error");

readFile = function () {
    $.get('words.txt', function (data) {
        arr = data.split('\n');
        console.log(arr);
    });
}

selectWord = () => {
    arrWord = arr.join(" ").split(" ");
    console.log(arrWord);
    chars = '';
    randomWord = arrWord[Math.floor(Math.random() * arrWord.length - 1)].split('');
    wordLength = randomWord.length;
    print.textContent = `I am thinking of a word that is ${wordLength} letters long.`;
    wordsLeft.textContent = `You have 6 guesses left`;
    printletters.textContent = `Here are the letters left: ${alphaArray}`;
    printWarning.textContent = ``;
    //hint();
    for (let i = 0; i < wordLength; i++) {
        chars += "*";
    }
    printChar.textContent = chars;
    console.log(randomWord);
}

checking = () => {
    let letters = /^[A-Za-z]+$/;
    if (!userVal.value.match(letters)) {
        warning -= 1;
        printWarning.textContent = `Oops! That is not a valid letter. You have ${warning} warnings left.`;
        gameOver();
    } else if (alphaArray.includes(userVal.value.toLowerCase())) {
        getInpVal();
        console.log("alphaArray ", alphaArray, "userVal.value.toLowerCase()", userVal.value.toLowerCase());
        gameOver();
    } else {
        warning -= 1;
        printWarning.textContent = `Oops! You've already guessed that letter. You have ${warning} warnings left.`;
        gameOver();
    }
}

getInpVal = () => {
    let sum = 0, been = false;
    for (let i = 0; i < wordLength; i++) {
        if (userVal.value === randomWord[i]) {
            chars = chars.substr(0, i) + userVal.value.toLowerCase() + chars.substr(i + 1);
            printChar.textContent = chars;
            printMessage.textContent = `Good guess`;
            been = true;
            sum = 0;
            winning += 1;
            console.log("alphaArray", alphaArray);
        } else {
            sum = 1;
        }
    }
    if (been == false) {
        count -= sum;
        printMessage.textContent = `Oops! That letter is not in my word.`;
    }
    if (winning === wordLength) {
        alert("Congratulations, you won");
        location.reload();
    }
    alphaArray.splice(alphaArray.indexOf(userVal.value.toLowerCase()), 1);
    printletters.textContent = `Here are the letters left: ${alphaArray}`;
    been = false;
    userVal.value = '';
    wordsLeft.textContent = `You have ${count} guesses left`;
    printChar.textContent = chars;
    console.log(`chars `, chars);
    checkingArr.length = 0;
    checkingArr.push(chars.split(""));
    console.log("checkingArr ", checkingArr);
    //console.log("jj ", jj);
    some = checkingArr[0].indicesOf("*");
    getIndexesOfGuessedCharacters();
    console.log("some ", some);
}

getIndexesOfGuessedCharacters = () => {
   // mia = [];
    for (var i = 1; i < some.length; i++) {
        if (some[i] - some[i - 1] != 1) {
            var x = some[i] - some[i - 1];
            var j = 1;
            while (j < x) {
                mia.push(some[i - 1] + j);
                j++;
            }
        }
    }
    if (checkingArr[0][0] !== "*") {
        mia.unshift(0);
    }
    if (checkingArr[0][checkingArr[0].length - 1] !== "*") {
        mia.push(checkingArr[0].length - 1);
    }
    mia = [...new Set(mia)];
    checkIndexes = mia.length;
    console.log("MIA!!!!!!! ", mia)
}

hint = () => {
    let num = 0, j, ok;
    changedArr = [];
    anotherArr = [];
    hintArr = [];   
    for (let i = 0; i < arrWord.length; i++) {
        changedArr.push(arrWord[i].split(''));
    }
    for (let i = 0; i < changedArr.length; i++) {
        if (randomWord.length === changedArr[i].length)
            anotherArr.push(changedArr[i]);
    }
    for (let i = 0; i < anotherArr.length; i++) {
        for ( j = 0; j < checkIndexes; j++) {
            ok = false;
            if (checkingArr[0][mia[j]] === anotherArr[i][mia[j]]) {
                console.log("[mia[j]",  mia[j])
                num += 1;
                ok = true;
                // if (num === checkIndexes) {
                //     hintArr.push(anotherArr[i])
                // }
            }
            if (num === checkIndexes) {
                    hintArr.push(anotherArr[i])
                }
        }
    }
    console.log("changedArr !!!!!!!!!!!!!!!!!!!!!!!", changedArr);

    console.log("hintArr ", hintArr);
}

gameOver = () => {
    if (count < 0 || warning < 0) {
        alert("Game over, you lost");
        location.reload();
    }
}

hint = () => {
    let num = 0, j, ok;
    changedArr = [];
    anotherArr = [];
    hintArr = [];   
    for (let i = 0; i < arrWord.length; i++) {
        changedArr.push(arrWord[i].split(''));
    }
    for (let i = 0; i < changedArr.length; i++) {
        if (randomWord.length === changedArr[i].length)
            anotherArr.push(changedArr[i]);
    }
    for (let i = 0; i < anotherArr.length; i++) {
        for ( j = 0; j < checkIndexes; j++) {
            ok = false;
            console.log(j);
            if (checkingArr[mia[j]] === anotherArr[i][mia[j]]) {
                console.log("[mia[j]",  mia[j])
                num += 1;
                ok = true;
                if (num === checkIndexes) {
                    hintArr.push(anotherArr[i])
                }
            }           
        }
    }
    console.log("changedArr !!!!!!!!!!!!!!!!!!!!!!!", changedArr);
    console.log("anotherArr ", anotherArr);
    console.log("hintArr ", hintArr);
    //console.log("[mia[j]",  mia[j])
}

getIndexesOfGuessedCharacters = () => {
    mia = [];
    for (var i = 1; i < some.length; i++) {
        if (some[i] - some[i - 1] != 1) {
            var x = some[i] - some[i - 1];
            var j = 1;
            while (j < x) {
                mia.push(some[i - 1] + j);
                j++;
            }
        }
    }
    if (checkingArr[0] !== "*") {
        mia = [0, ...mia];
    }
    if (checkingArr[checkingArr.length - 1] !== "*") {
        mia = [...mia, (checkingArr.length - 1)];
    }
    //mia = [...new Set(mia)];
    checkIndexes = mia.length;
    console.log("MIA!!!!!!! ", mia)
}

for (let i = 0; i < arrOfSameLength.length; i++) {
    for (j = 0; j < arrOfSameLength[0].length; j++) {
        if (wordCheckingArr[j] === "*") {
            ok = true
            continue;
            console.log("from if continue", arrForResults);
        } else if (wordCheckingArr[j] !== "*") {
            ok = false;
            if (arrOfSameLength[i][j] !== wordCheckingArr[j]) {
                break;
                console.log("from if break", arrForResults);
            }
            if (arrOfSameLength[i][j] === wordCheckingArr[j]) {
                ok = true;
                //console.log("from if ok=true", arrForResults);
            }
        }
    }
    if (j === arrOfSameLength[0].length - 1 && ok === true) {
        arrForResults.push(arrOfSameLength[j]);
        console.log("from if ", arrForResults);
    }

}