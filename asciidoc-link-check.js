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
            checkResult = checkLink(path).then((value) => {
                logCheckResult(row, index, value, path);
            });
        }
    });
}


async function checkLink(path) {

    try {
        const response = await fetch(path);
        const responseStatus = response.status.toString();
        const responseText = response.statusText.toString();
        // console.log(`${ responseStatus } ${ responseText }`);
        return `${ responseStatus } ${ responseText }`;
    }
    catch (err) {
        // console.log('FAILD');
        return 'FAILD';
    }
}


async function logCheckResult(lineNumber, matchIndex, checkResult, path) {

    let promise = new Promise((resolve, reject) => {
        resolve(`${ lineNumber }:${ matchIndex }   ${ checkResult }   ${ path }`);
    });

    let result = await promise;

    console.log(result);
}


main(readlineInterface);