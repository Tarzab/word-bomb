console.warn = console.error = () => {};

const fs = require('fs');
const clipboardy = require('clipboardy');
const prompt = require('prompt-sync')();
let containingString;
let words = fs.readFileSync("words.txt").toString();
let correctWords = [];

words = words.split("\n");
console.log("\n-- Type required letters in. Say #exit to exit. --\n");

while (true) {
    correctWords = [];
    let regularExpression = prompt('Letters: ')
    if (regularExpression == "#exit") break;
    containingString = new RegExp(regularExpression);
    let len = words.length;

    while (len--) {
        if (containingString.test(words[len]))
            correctWords.push(words[len]);
    }
    if (correctWords.length < 1) console.log("------------------ No matching words");
    else{
        let randomWord = Math.round(Math.random() * correctWords.length);
        if(correctWords[randomWord] === undefined){
            console.log("------------------ Something went wrong!");
        }
        else{
            clipboardy.writeSync(correctWords[randomWord]);
            console.log("------------------ " + correctWords[randomWord]);
        } 
    }
}