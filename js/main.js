// let MyApp = function() {
//     let self = this,
//         max = 100,
//         min = 4,        
//         print = document.getElementById("print");

//         init = function (divId) {
//             forCells = divId;
//         },

//         getId = function(params) {
//             return document.getElementById(params);
//         },

//         printing = function(inpVal) {
//             if (typeof print !== null) {
//                 print.textContent = "Number of cells: " + inpVal.value * inpVal.value;
//             }
//         },

//         checkingBtn = function() {
//             if(forCells.firstChild){
//                 self.getId('resets').disabled = false;
//                 self.getId('colourises').disabled = false;
//                 self.getId('draws').disabled = true;
//             } else {
//                 self.getId('resets').disabled = true;
//                 self.getId('colourises').disabled = true;
//                 self.getId('draws').disabled = false;
//             }
//         },

//         draw = function() {
//             let inputVal = self.getId("num").value;
//             if (inputVal < min || inputVal > max) {
//                 alert(`Please enter a number between ${min} and ${max}, or you are going to get this annoying alert notification :)`);
//             } else {
//                 var i,
//                     j,
//                     newDiv,
//                     newSpan;
//                 let fragment = document.createDocumentFragment();
//                 for (i = 0; i < inputVal; i++) {
//                     let newCol = document.createElement('div');
//                     newCol.classList.add("column");
//                     for (j = 0; j < inputVal; j++) {                        
//                         newDiv = document.createElement('div');
//                         newCol.appendChild(newDiv);               
//                     }
//                     fragment.appendChild(newCol);
//                 }            

//                 forCells.appendChild(fragment);
//                 checkingBtn();
//             }
//         },       

//         getColor =  function() {
//             var r = function () { return Math.floor(Math.random()*256) };
//             return "rgb(" + r() + "," + r() + "," + r() + ")";
//         },

//         colourise =  function() {
//             let toColour =  document.querySelectorAll('.column > div'); 
//             for (let i = 0; i < toColour.length; i++) {
//                     setTimeout(function() {
//                         toColour[i].style.backgroundColor = self.getColor();
//                         toColour[i].style.transition = "all 1.5s";
//                     }, 1500 * i);           
//         }
//         },

//         reset =  function() {
//             print.textContent = "";
//             while (forCells.firstChild) {
//                 forCells.removeChild(forCells.firstChild);
//             }
//             checkingBtn();
//         }

//     return {
//         init: init,
//         printing: printing,
//         draw: draw,
//         colourise: colourise,
//         reset: reset
//     }
// }

// var simpleApp;

//     var divId = document.getElementById('forCells');
//     simpleApp = MyApp(); //Invoke the object (function assigned to the object) and assign to simpleApp
//     simpleApp.init(divId);

getId = function (params) {
    return document.getElementById(params);
};

Array.prototype.indicesOf = function (x) {
    return this.reduce((p, c, i) => c === x ? p.concat(i) : p, []);
};

let randomWord, arrWord, arr = [], changedArr = [], anotherArr = [], checkingArr = [], mia = [], some = [], elen = [], chars = '', count = 6, warning = 3, winning = 0, wordLength = 0, alphaArray = "abcdefghijklmnopqrstuvwxyz".split(""), userVal = getId("txt"),

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
    hint();
    for (let i = 0; i < wordLength; i++) {
        chars += "*";
    }
    printChar.textContent = chars;
    console.log(randomWord);
}

hint = () => {
    let j,ok;
    for (let i = 0; i < arrWord.length; i++) {
        changedArr.push(arrWord[i].split(''));
    }
    for (let i = 0; i < changedArr.length; i++) {
        if (randomWord.length === changedArr[i].length)
            anotherArr.push(changedArr[i]);
    }
    for (let i = 0; i < anotherArr.length; i++) {
        for (j = 0; j < anotherArr[0].length; j++) {
            ok = false;
            if (anotherArr[i][j] === "*") {
                continue;
            } else if (anotherArr[i][j] !== "*") {
                if (anotherArr[i][j] !== checkingArr[j]) {
                    break;
                 }
                 if (anotherArr[i][j] === checkingArr[j])
                 {
                      ok = true;
                 }
            }
        }
        if(j === anotherArr[0].length-1 && ok === true)
        {
            elen.push(anotherArr[j]);
        }

    }
    console.log(changedArr);
    console.log("anotherArr ", anotherArr);
    console.log("elen ", elen);
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
            console.log(alphaArray);
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
    console.log(`chars `,chars);
    checkingArr.length = 0;
    checkingArr.push(chars.split(""));
    console.log("checkingArr ", checkingArr);
    hint();
    let jj = Array.from(checkingArr);
    console.log("jj ", jj);
    some = jj.indicesOf("*");    
    console.log("some ", some);
}

gameOver = () => {
    if (count < 0 || warning < 0) {
        alert("Game over, you lost");
        location.reload();
    }
}