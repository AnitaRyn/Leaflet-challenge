// earthquake URL
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// perform a GET request to the query URL
d3.json(queryUrl, function(data) {

  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // define a function to run for each feature 
  // give each feature a popup describing the place, time and magnitude of the earthquake
  function popUp(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place + "</h3><h3>Magnitude: "+ feature.properties.mag +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

function createMarkers(data){
  // pull the location property off of response.data
  var location = data.features.properties.mag;
      
  // Initialize an array to hold magnitude circles
  var mapMark = [];
  
  // Loop through the features array
  for (var i = 0; i < data.length; i++) {
    var color = "";
    if (data[i].features.properties.mag <=3) {  
      color="yellow";
    }
    else if (data[i].features.properties.mag >3) {
      color = "red";
    }
    else {
      color = "green";
    }

  return L.circleMarker(location, mapMark);
}

  // create a GeoJSON layer 
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: popUp,
    pointToLayer: createMarkers
  });

  // earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });


  // define a baseMaps object 
  var baseMaps = {
    "Street Map": streetmap,
    "Dark map": darkmap
  };

  // create overlay object 
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control for the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}}
