# reverse-geojson
Reverse geojson generated with mapshaper to use it with d3.

Using d3 to plot a geojson from an INEGI or INE map can be complicated. If a tool like [mapshaper](https://mapshaper.org) is used to convert the .shp documents to .json, they will have the vertices in a different order than d3 requires to graph them correctly.

To use it, you have to import the library, and pass it a geojson to correct the order in which its coordinates are arranged(clockwise)

```js
// import the method
const reverseGeojson = require("reverse-geojson");

// reverse the geojson
const clockwiseCoordinates   = reverseGeojson(someGeojson);
```


For example, if we use mapshaper to generate a geojson of the Mexican Republic using the official INEGI shp file, and from there we use d3 to display it, this is what we would get:

```js
import {create} from "d3-selection";
import { geoPath, geoMercator } from "d3-geo";
const m = require("./mexico.json");

const width = 800;
cont height = 800;

let root  = document.getElementById("mexico");
let svg   = create("svg").attr("viewBox", [0,0,width,height]);

let projection = geoMercator().fitExtent([[0,0], [width,height]], m);
let path       = geoPath(projection);

svg.selectAll("path")
    .data(m.features)
    .enter().append("path")
    .attr("d",path);

root.appendChild(svg.node())
```

<img src="https://user-images.githubusercontent.com/3756555/154812477-af99f2c4-9a1e-4624-9005-828e15355bb4.png" alt="error with reverse points">


Instead, if we first change the order of the coordinates, the map will be displayed correctly:

```js
import {create} from "d3-selection";
import { geoPath, geoMercator } from "d3-geo";
const reverseGeojson = require("reverse-geojson");
const m = require("./mexico.json");

const width = 800;
const height = 800;
// reverse the coordinates first
const geo = reverseGeojson(m);

let root  = document.getElementById("mexico");
let svg   = create("svg").attr("viewBox", [0,0,width,height]);

let projection = geoMercator().fitExtent([[0,0], [width,height]], geo);
let path       = geoPath(projection);

svg.selectAll("path")
    .data(geo.features)
    .enter().append("path")
    .attr("d",path);

root.appendChild(svg.node())
```

<img src="https://user-images.githubusercontent.com/3756555/154812482-c0d5405f-79f6-4e46-afe1-c6fa0fa0366e.png" alt="correct render of bananas' republic">


