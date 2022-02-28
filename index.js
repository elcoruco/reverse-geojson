/*
/  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
/
/  Define the plugin
/
/  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
*/

const r = geo => {
  if(geo.geometry.type == "MultiPolygon"){
    geo.geometry.coordinates = [geo.geometry.coordinates.map(d => d[0].slice().reverse())]
  }
  else{
    geo.geometry.coordinates = [geo.geometry.coordinates[0].slice().reverse()];
  }
  return geo;
}

const reverseGeojson = geoCollection => {
  if(geoCollection.features){
    try{
      for(let geo of geoCollection.features){
        geo = r(geo);
      }
    }
    catch(e){
      throw(e);
    }
  }
  else if(Array.isArray(geoCollection)){
    try{
      for(let geo of geoCollection){
        geo = r(geo);
      }
    }
    catch(e){
      throw(e);
    }
  }

  else if(geoCollection.geometry){
   try{
    r(geoCollection)
   }
   catch(e){
     throw(e)
   }
  }
  else{
    throw "I cannot understand WTF with your file"
  }
  
  return geoCollection;
}


// ----------------------------------------------------------------
// UMD WRAPPER
// https://github.com/umdjs/umd/blob/master/templates/returnExports.js
// ----------------------------------------------------------------

// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define([], factory);
  } else if (typeof module === 'object' && module.exports) {
      // Node. Does not work with strict CommonJS, but
      // only CommonJS-like environments that support module.exports,
      // like Node.
      module.exports = factory();
  } else {
      // Browser globals (root is window)
      root['reverseGeojson'] = factory();
}
}(typeof self !== 'undefined' ? self : this, function () {

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.


  return reverseGeojson;
}));