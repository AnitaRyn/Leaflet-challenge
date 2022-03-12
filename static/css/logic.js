console.log("Step 1 working");
// create map function
//function createMap(earthquakes) {

    // define darkmap layers  
    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", 
    {
      attribution: "© <a href=\"https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
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
        layers: [darkmap, earthquakes]
      });

    darkmap.addTo(map);

    d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data){

    // create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
  }

    function createCircles(response){

      // Pull the location property off of response.data
      var location = response.data.features;
      
      // Initialize an array to hold magnitude circles
      var createCircles = [];
      
      // Loop through the features array
      for (var i = 0; i < grades.length; i++) {
      }
        var location = response.features[i].geometry.coordinates[0][1];
        
        // For each location, create a marker and bind a popup with the location
      var locationCircle = L.circle(features.location, {
        fillOpacity: 0.75,
        color: "white",
        fillColor: color,
        radius: features.properties.mag
      }).bindPopup("<h1>" + features[i].geometry.coordinates[0][1] + "</h1> ").addTo(map);
    
      // Add the marker to the circles array
      locationCircle.push(locationCircle);
      }
    
    // Create a layer group made from the circles array, pass it into the createMap function
      createMap(L.layerGroup(locationCircle));

