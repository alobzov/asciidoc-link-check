const { argv } = require('process');
const fs = require('fs');
const readline = require('readline');

// regular expression for http- and https-link extraction
const pattern = /\bhttps?:\/\/[^\s|^[]+\b/g;


function asciidocLineCheck(file) {

    const readableStream = fs.createReadStream(file);

    const readlineInterface = readline.createInterface({
        input: readableStream,
        output: process.stdout,
        terminal: false
    });

    let lineNumber = 0;
    let match;

    readlineInterface.on('line', function(line) {

        lineNumber++;

        while ((match = pattern.exec(line)) !== null) {

            logCheckLinkResult(lineNumber, match.index, match[0]);
        }
    });
}

/*
  check link availability function,
  return http code and status
*/
async function checkLink(link) {

    try {

        const response = await fetch(link);
        const responseStatus = response.status.toString();
        const responseText = response.statusText.toString();

        return `${ responseStatus } ${ responseText }`;
    }
    catch (err) {

        return `FAILED`;
    }
}

/*
  log check link result function,
  return link position and it's availability information
*/
async function logCheckLinkResult(row, index, link) {

    const checkLinkResult = await checkLink(link);

    console.log(`${ row }:${ index }   ${ checkLinkResult }   ${ link }`);
}


asciidocLineCheck(argv[2]);


module.exports = { checkLink, logCheckLinkResult };