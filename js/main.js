let MyApp = function () {
    getId = (params) => {
        return document.getElementById(params);
    };

    let guessRandomWord, arrOfWords, arr = [], hintArr = [], wordCheckingArr = [], chars = '', count = 6, points, warning = 3, winning = 0, guessWordLength = 0, alphabetArray = "abcdefghijklmnopqrstuvwxyz".split(""), userVal = getId("txt"),

        print = getId("ammountOfLetters"),
        charsLeft = getId("guess"),
        printChar = getId("ammountOfChars"),
        printletters = getId("letters"),
        printWarning = getId("warning"),
        printMessage = getId("message"),
        buttons = document.getElementsByClassName("myButtons");
    printHints = getId("hints");

    /**
     * Gets words from the txt file
     */
    readFile = function () {
        $.get('words.txt', function (data) {
            arr = data.split('\n');
            console.log(arr)
        });
    }
    /**
     * Enables buttons
     */
    enableButtons = () => {
        for (let i = 0, arrLength = buttons.length; i < arrLength; ++i) {
            buttons[i].disabled = false;
        }
    }

    /**
     * Chooses random word for guessing and prints the *
     */
    selectWord = () => {
        enableButtons();
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
        for (let i = 0; i < guessWordLength; ++i) {
            chars += "*";
        }
        printChar.textContent = chars;
        console.log(guessRandomWord);
    }

    /**
     * Checks input value
     */
    checkingInputValue = () => {
        let letters = /^[A-Za-z]+$/;
        if (!userVal.value.match(letters)) {
            warning -= 1;
            printWarning.textContent = `Oops! That is not a valid letter. You have ${warning} warnings left.`;
            gameOver();
        } else if (alphabetArray.includes(userVal.value.toLowerCase())) {
            getInpVal();
            gameOver();
        } else {
            warning -= 1;
            printWarning.textContent = `Oops! You've already guessed that letter. You have ${warning} warnings left.`;
            gameOver();
        }
    }

    /**
     * Checks if the user typed charackter is in the word and prints it
     */
    getInpVal = () => {
        let sum = 0, been = false;
        for (let i = 0; i < guessWordLength; ++i) {
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
    }

    /**
     * Prints all the words which are the same length with the guessing word and has the same letters on the same position
     */
    hint = () => {
        let nestedArrOfWords = [],
            arrOfSameLength = [];
        hintArr = [];
        let j, myNum = 0;
        for (let i = 0, arrLength = arrOfWords.length; i < arrLength; ++i) {
            nestedArrOfWords.push(arrOfWords[i].split(''));
        }
        for (let i = 0, arrLength = nestedArrOfWords.length; i < arrLength; ++i) {
            if (guessRandomWord.length === nestedArrOfWords[i].length)
                arrOfSameLength.push(nestedArrOfWords[i]);
        }
        for (let i = 0, arrLength = arrOfSameLength.length; i < arrLength; ++i) {
            myNum = 0;
            for (j = 0, nestedArrLength = wordCheckingArr.length; j < nestedArrLength; j++) {
                if (wordCheckingArr[j] !== "*" && wordCheckingArr[j] === arrOfSameLength[i][j]) {
                    myNum++;
                }
            }
            if (myNum === winning) {
                hintArr.push(arrOfSameLength[i].join(''));
            }
        }
        printHints.textContent = `POSSIBLE WORDS ARE: ${hintArr.join(' ')}`;
        console.log(`nestedArrOfWords`, nestedArrOfWords);
        console.log("arrOfSameLength ", arrOfSameLength);
        console.log("hintArr ", hintArr);
    }

    /**
     * Checks if player lost or won the game
     */
    gameOver = () => {
        if (count <= 0 || warning < 0) {
            alert(`Game over, you lost, the word is - ${guessRandomWord.join('')}`);
            location.reload();
        }
        if (winning === guessWordLength) {
            alert(`Congratulations, you won. Your score is ${count * points}`);
            location.reload();
        }
    }

    return {
        readFile: readFile,
        selectWord: selectWord,
        checkingInputValue: checkingInputValue,
        hint: hint
    }
}()
