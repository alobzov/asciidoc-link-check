const { argv } = require('process');
const fs = require('fs');
const readline = require('readline');

const readableStream = fs.createReadStream(argv[2]);

const readlineInterface = readline.createInterface({
    input: readableStream,
    output: process.stdout,
    terminal: false
});

const pattern = /\bhttps?:\/\/[^\s|^[]+\b/g;


function main(interface) {

    let lineNumber = 0;
    let match;

    interface.on('line', function(line) {

        lineNumber++;
        let path;
        let row;
        let index;
        let checkResult;

        while ((match = pattern.exec(line)) !== null) {
            path = match[0];
            row = lineNumber;
            index = match.index;
            checkLink(row, index, path);
        }
    });
}


async function checkLink(lineNumber, matchIndex, path) {

    try {
        const response = await fetch(path);
        const responseStatus = response.status.toString();
        const responseText = response.statusText.toString();
        console.log(`${ lineNumber}:${ matchIndex }   ${ responseStatus } ${ responseText }   ${ path }`);
    }
    catch (err) {
        console.log(`${ lineNumber}:${ matchIndex }   FAILD   ${ path }`);
    }
}


main(readlineInterface);