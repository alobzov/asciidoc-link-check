const { argv } = require('process');
const fs = require('fs');
const readline = require('readline');

const readableStream = fs.createReadStream(argv[2]);

const readlineInterface = readline.createInterface({
    input: readableStream,
    output: process.stdout,
    terminal: false
});

let stringNumber = 0;
let match;
const pattern = /\bhttps?:\/\/[^\s|^[]+\b/g;

readlineInterface.on('line', function(line) {
    stringNumber++;
    while ( (match = pattern.exec(line)) !== null) {
        console.log(`${ stringNumber }:${ match.index }:   200 OK   ${ match[0] }`);
    }
});