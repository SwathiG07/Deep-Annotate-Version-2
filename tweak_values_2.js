const fs = require('fs');

let html = fs.readFileSync('about.html', 'utf8');

// 1. Fix sticky by removing overflow: hidden from the section
html = html.replace('.new-val { position: relative; overflow: hidden; }', '.new-val { position: relative; }');

// 2. Also ensure .val-left has align-self: start if it wasn't already, but wait, the grid is align-items: flex-start, so it should be fine. Actually, if align-items: flex-start is there, it shrinks the item. Let's make sure it's sticky. Let's just rely on removing overflow: hidden. Wait, the left column IS the grid item. If it's shrunk to content height, it can't stick within itself. We need the grid item to stretch, and the inner content to stick, or we can just apply position: sticky to the grid item AND remove align-items: flex-start from the grid, BUT give the grid item align-self: start? No, if we give it align-self: start it shrinks. 
// Actually, in CSS Grid, a grid item with position: sticky WILL stick within the grid area if the grid item stretches (i.e. align-self: stretch, the default). 
// Let's remove align-items: flex-start from the grid, and make sure .val-left has align-self: start. Wait, no. If align-self: start is used, the item shrinks and CANNOT stick because it has no room to move.
// Wait, the correct way: The grid item STRETCHES (default). Inside the grid item, the content has position: sticky. 
// Or, the grid item itself has position: sticky, AND align-self: start. Wait, if a grid item has align-self: start, its height is content height. Its containing block is the grid container. So position: sticky WILL work! 
// Let's test by just removing overflow: hidden, which is the #1 killer of position: sticky.

// Let's modify the grid to guarantee sticky works:
html = html.replace('.val-split { display: grid; grid-template-columns: 1fr 1.5fr; gap: 80px; align-items: flex-start; }', '.val-split { display: grid; grid-template-columns: 1fr 1.5fr; gap: 80px; align-items: start; }');

// 3. Make text completely visible (not invisible/muted)
// Change body opacity from 0.4 to 1
html = html.replace('.val-body { \n      max-height: none; overflow: visible; opacity: 0.4;', '.val-body { \n      max-height: none; overflow: visible; opacity: 1;');

// Change title color from rgba(255,255,255,0.6) to #FFFFFF
html = html.replace('.val-header .vt { font-size: 28px; color: rgba(255,255,255,0.6);', '.val-header .vt { font-size: 28px; color: #FFFFFF;');

// Remove the transition on color for val-num if we want it clear, or let's make val-num more visible
html = html.replace('.val-num { \n      font-size: 64px; font-weight: 900; color: rgba(255, 255, 255, 0.04);', '.val-num { \n      font-size: 64px; font-weight: 900; color: rgba(255, 255, 255, 0.15);');

fs.writeFileSync('about.html', html);
console.log('Fixed sticky header and made text fully visible.');
