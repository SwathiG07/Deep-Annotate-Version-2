const fs = require('fs');

const currentHtml = fs.readFileSync('about.html', 'utf8');
const oldHtml = fs.readFileSync('old_about.html', 'utf8');

// Find the map section in both
const mapRegex = /<!-- 7\. GLOBAL MAP -->[\s\S]*?<\/section>/;
const currentMap = currentHtml.match(mapRegex);
const oldMap = oldHtml.match(mapRegex);

if (!currentMap || !oldMap) {
  console.log("Could not find map section in one of the files.");
} else if (currentMap[0] === oldMap[0]) {
  console.log("Map HTML is IDENTICAL.");
} else {
  console.log("Map HTML has changed. Restoring old HTML...");
  let newHtml = currentHtml.replace(mapRegex, oldMap[0]);
  fs.writeFileSync('about.html', newHtml);
  console.log("Restored Map HTML from git HEAD.");
}

// Check if any CSS changed related to the map
// Let's also restore the JS for the map if it changed
const jsRegex = /\/\/\s*3\. MAP RENDERING[\s\S]*?\}\)\(\);/;
const currentJs = currentHtml.match(jsRegex);
const oldJs = oldHtml.match(jsRegex);

if (currentJs && oldJs && currentJs[0] !== oldJs[0]) {
  console.log("Map JS has changed. Restoring old JS...");
  let newHtml2 = fs.readFileSync('about.html', 'utf8');
  newHtml2 = newHtml2.replace(jsRegex, oldJs[0]);
  fs.writeFileSync('about.html', newHtml2);
  console.log("Restored Map JS from git HEAD.");
}
