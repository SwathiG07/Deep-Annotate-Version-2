const fs = require('fs');
const execSync = require('child_process').execSync;

// 1. Get current about.html
const current = fs.readFileSync('about.html', 'utf8');

// 2. Extract current <style> block
const styleStart = current.indexOf('<style>');
const styleEnd = current.indexOf('</style>') + 8;
const currentStyle = current.substring(styleStart, styleEnd);

// 3. Get original about.html from git
const original = execSync('git show HEAD:about.html', {encoding: 'utf8'});

// 4. Extract original <style> block
const origStyleStart = original.indexOf('<style>');
const origStyleEnd = original.indexOf('</style>') + 8;

// 5. Replace original style with current style
let restored = original.substring(0, origStyleStart) + currentStyle + original.substring(origStyleEnd);

// 6. Replace the 4 timeline emojis with SVGs (ONLY in the timeline block)
const timelineStart = restored.indexOf('<section id="story"');
const timelineEnd = restored.indexOf('</section>', timelineStart);

let timelineHtml = restored.substring(timelineStart, timelineEnd);

const svgs = {
  ban: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>',
  lightbulb: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>',
  globe: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>',
  rocket: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 3.82-13 1.5 1.5 0 0 1 2.18 2.18A22 22 0 0 1 12 15Z"/><path d="M9 9h.01"/><path d="M15 15h.01"/></svg>'
};

timelineHtml = timelineHtml.replace('&#128683;', svgs.ban);
timelineHtml = timelineHtml.replace('&#128161;', svgs.lightbulb);
timelineHtml = timelineHtml.replace('&#127758;', svgs.globe);
timelineHtml = timelineHtml.replace('&#128640;', svgs.rocket);

restored = restored.substring(0, timelineStart) + timelineHtml + restored.substring(timelineEnd);

fs.writeFileSync('about.html', restored);
console.log('Restored all original HTML structure and emojis, while preserving custom CSS and replacing only the timeline emojis.');
