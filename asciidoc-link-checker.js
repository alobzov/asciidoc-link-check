#!/usr/bin/env node
const { argv } = require('process');
const fs = require('fs');
const readline = require('readline');


async function asciidocLinkCheck(file) {

    let exitCode;

    if ( file === undefined ) {

        // -2 - file is undefined
        exitCode = -2;
    } else {

        if ( file.split('.').at(-1) === "adoc" ) {

            // 0 - all links are valid, -1 - one of the links is invalid
            exitCode = await checkFileLinks(file);
        } else {

            // -3 - is not adoc file
            exitCode = -3;
        }
    }
    console.log(`Exit code: ${ exitCode }`);
    return exitCode;
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

        return { exitCode: 0, value: `${ responseStatus } ${ responseText }` };
    }
    catch (err) {

        return { exitCode: -1, value: `FAILED` };
    }
}

/*
  log check link result function,
  return link position and it's availability information
*/
async function logCheckLinkResult(row, index, link) {

    const checkLinkResult = await checkLink(link);
    console.log(`${ row }:${ index }   ${ checkLinkResult.value }   ${ link }`);

    // 0 - valid link code, -1 - invalid link code
    const exitCode = (checkLinkResult.value === '200 OK') ? 0 : -1;
    return exitCode;
}


/*
  check file links function,
  return file links positions and their availability status
*/
async function checkFileLinks(file) {

    try {

        // regular expression for http- and https-link extraction
        const pattern = /\bhttps?:\/\/[^\s|^[]+\b/g;

        const readableStream = fs.createReadStream(file);

        const readlineInterface = readline.createInterface({
            input: readableStream,
            output: process.stdout,
            terminal: false
        });

        let lineNumber = 0;
        let match;

        // 0 - valid link code, -1 - invalid link code
        let exitCode = 0, res;

        for await (const line of readlineInterface) {

            lineNumber++;

            while ((match = pattern.exec(line)) !== null) {

                res = await logCheckLinkResult(lineNumber, match.index + 1, match[0]);
                if (res === -1) {
                    exitCode = res;
                }
            }
        }

        return exitCode;
    } catch (err) {

        // -4 - no such file
        return -4
    }
}


asciidocLinkCheck(argv[2]);


module.exports = { checkLink, logCheckLinkResult, checkFileLinks, asciidocLinkCheck };