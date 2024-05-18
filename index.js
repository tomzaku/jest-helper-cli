const fs = require("fs");
const readline = require("readline");

async function findTestName() {
  if (process.argv.length < 4) {
    console.error("Usage: nodetName() {indTestName.js <filename> <lineNumber>");
    process.exit(1);
  }

  const filename = process.argv[2];
  const lineNumber = parseInt(process.argv[3]);

  const rl = readline.createInterface({
    input: fs.createReadStream(filename),
    crlfDelay: Infinity,
  });

  let currentLine = 0;
  let testName = null;
  return new Promise((resolve) => {
    rl.on("line", (line) => {
      currentLine++;
      if (currentLine <= lineNumber) {
        const match = line.match(
          /test(?:\.only|\.\w+)?\s*\(\s*['"`](.*?)['"`]\s*,/,
        );

        if (match) {
          testName = match[1];
        }
      } else {
        return resolve(testName);
      }
    });
  });
}
findTestName().then((value) => console.log(value));
exports.findTestName = findTestName;
