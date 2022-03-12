
// create map function
function createMap(earthquakes) {

    // define darkmap layers  
    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "dark-v10",
      accessToken: API_KEY
    });
  
    // define a baseMaps object to hold the base layers
    var baseMaps = {
      "Dark Map": darkmap
    };
    
    // create an overlayMaps object to hold the earthquakes layer
    var overlayMaps = {
      "Earthquakes":earthquakes
    };

    //create the map object with options
    var map = L.map("map", {
        center: [
          37.09, -95.71
        ],
        zoom: 5,
        layers: [streetmap, earthquakes]
      });
    // create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
  }

    function createCircles(response){

      // Pull the location property off of response.data
      var location = response.data.stations;
      
      // Initialize an array to hold magnitude circles
      var createCircles = [];
      
      // Loop through the features array
      for (var i = 0; i < response.features.length; i++) {
        var location = response.features[i].geometry.coordinates[0][0];
        
        // For each location, create a marker and bind a popup with the station's name
      var locationCircle = L.circle(features.location, {
        fillOpacity: 0.75,
        color: "white",
        fillColor: color,
        radius: features.properties.mag
      }).bindPopup("<h1>" + features[i].geometry.coordinates[0][0] + "</h1> ").addTo(map);
    
      // Add the marker to the bikeMarkers array
      locationCircle.push(locationCircle);
      }
    
    // Create a layer group made from the bike markers array, pass it into the createMap function
      createMap(L.layerGroup(locationCircle));
    }
    // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createCircles);
  
