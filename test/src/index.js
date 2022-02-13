import {create} from "d3-selection";
import { geoPath, geoMercator } from "d3-geo";
const reverseGeojson = require("reverse-geojson");
const m = require("./mexico.json");


const settings = {
  width: 800,
  height : 800
}

let root  = document.getElementById("mexico");
let svg   = create("svg").attr("viewBox", [0,0,settings.width, settings.height]);
let geo   = reverseGeojson(m);

let projection = geoMercator().fitExtent([[0,0], [settings.width,settings.height]], geo);
let path       = geoPath(projection);

svg.selectAll("path")
    .data(geo.features)
    .enter().append("path")
    .attr("d",path);

root.appendChild(svg.node())

// run npx webpack to compile this shit