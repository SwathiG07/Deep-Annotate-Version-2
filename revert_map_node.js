const fs = require('fs');
const execSync = require('child_process').execSync;

// Get the original about.html from git HEAD
const headHtml = execSync('git show HEAD:about.html').toString('utf8');
const currentHtml = fs.readFileSync('about.html', 'utf8');

const mapRegex = /<!-- 7\. GLOBAL MAP -->[\s\S]*?<\/section>/;
const currentMap = currentHtml.match(mapRegex);
const headMap = headHtml.match(mapRegex);

if (headMap) {
  if (currentMap && currentMap[0] !== headMap[0]) {
    fs.writeFileSync('about.html', currentHtml.replace(mapRegex, headMap[0]));
    console.log("Restored HTML from HEAD");
  } else {
    console.log("Map HTML is identical to HEAD.");
  }
} else {
  console.log("No GLOBAL MAP found in HEAD.");
}

// Restore JS for the map
const jsRegex = /\/\/\s*3\. MAP RENDERING[\s\S]*?\}\)\(\);/;
const jsRegex2 = /<script>\s*document\.addEventListener\("DOMContentLoaded", function\(\) {\s*const canvas = document\.getElementById\('globalMapCanvas'\);[\s\S]*?<\/script>/;

let newHtml = fs.readFileSync('about.html', 'utf8');

const headJs1 = headHtml.match(jsRegex);
if (headJs1) newHtml = newHtml.replace(jsRegex, headJs1[0]);

const headJs2 = headHtml.match(jsRegex2);
if (headJs2) {
  const currentJs2 = newHtml.match(jsRegex2);
  if (currentJs2) {
    newHtml = newHtml.replace(jsRegex2, headJs2[0]);
  } else {
    // maybe insert it?
  }
}

fs.writeFileSync('about.html', newHtml);
