const fs = require('fs');

const data = JSON.parse(fs.readFileSync('ne_land.geojson', 'utf8'));

const width = 1200;
const height = 600;

// Mercator projection
function project(lon, lat) {
    const x = (lon + 180) * (width / 360);
    const latRad = lat * Math.PI / 180;
    let mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    // clamp mercN to avoid infinity at poles (e.g. Antarctica)
    mercN = Math.max(-Math.PI, Math.min(Math.PI, mercN));
    // Center vertically
    const y = (height / 2) - (width * mercN / (2 * Math.PI));
    return [x, y];
}

let paths = [];

data.features.forEach(feature => {
    if (feature.geometry.type === 'Polygon') {
        feature.geometry.coordinates.forEach(ring => {
            let path = '';
            ring.forEach((coord, i) => {
                const [x, y] = project(coord[0], coord[1]);
                path += (i === 0 ? 'M' : 'L') + `${x.toFixed(1)},${y.toFixed(1)}`;
            });
            path += 'Z';
            paths.push(path);
        });
    } else if (feature.geometry.type === 'MultiPolygon') {
        feature.geometry.coordinates.forEach(poly => {
            poly.forEach(ring => {
                let path = '';
                ring.forEach((coord, i) => {
                    const [x, y] = project(coord[0], coord[1]);
                    path += (i === 0 ? 'M' : 'L') + `${x.toFixed(1)},${y.toFixed(1)}`;
                });
                path += 'Z';
                paths.push(path);
            });
        });
    }
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
    <path fill="#E8ECF2" d="${paths.join(' ')}" />
</svg>`;

fs.writeFileSync('world-map.svg', svg);
console.log('SVG generated.');
