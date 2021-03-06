//earthquake URL
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//perform a GET request to the query URL
d3.json(queryUrl, function(data) {

//send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  //define a function to run for each feature 
  //give each earthquake a popup describing the place and magnitude of the earthquake
  function popUp(features, layer) {
    layer.bindPopup("<h3>" + features.properties.place + "</h3><h3>Magnitude: "+ features.properties.mag +
      "</h3><hr><p>"  + "</p>");
  }
//create magnitude size marker function
function markerSize(data){
  return data *6;
}
//create magnitude color marker function
function markerColor(data){
  if (data <1 ) {
    color = "#FFC300";
  }
  else if (data <2.5) {
    color = "#FF5733";
  }
  else if (data >2.5) {
    color = "#C70039";
  }
  else if (data >4) {
    color = "#581845";
  }
}
//create a marker function
function marker(features, location){
  var mapMark = {
    radius: markerSize(features.properties.mag),
    color: markerColor(features.properties.mag),
    fillColor: color,
    fillOpacity: 0.35
  
  }
  return L.circleMarker(location, mapMark);
}

  //create a GeoJSON layer and connect popUp and marker function to earthquakeData
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: popUp,
    pointToLayer: marker
  });

  //earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  //define streetmap and greymap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  })
  var greymap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  //create a baseMaps object 
  var baseMaps = {
    "Street Map": streetmap,
    "Grey map":greymap
  };

  //create overlay object 
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  //create the map, showing the streetmap and earthquakes layers
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  //create legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var colors = ["#FFC300","#FF5733","#C70039","#581845"];
    var grades = [0,1,2.5,4];
    
    for (var i = 0; i<grades.length; i++){
      div.innerHTML += 
      `<div style="display:flex;gap:4px"><div style="background: ${colors[i]};width: 40%; height: 20px;"></div><span>${grades[i] + (grades[i + 1] ? `&ndash;  ${grades[i + 1]}`: "+")}</span></div>`;
    }
      return div;
  };

  //add legend to the map
  legend.addTo(myMap);

  //create a layer control for the map, so that both layers can be used
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
  
}
