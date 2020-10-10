url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"

var myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 5,
});



// Perform a GET request to the URL
d3.json(url, function(data) {

  for (var i = 0; i < data.features.length; i++) {

    // Conditionals for countries points
    var color = "";
    if (data.features[i].properties.mag > 5) {
      color = "red";
    }
    else if (data.features[i].properties.mag > 4) {
      color = "orange";
    }
    else if (data.features[i].properties.mag > 3) {
      color = "yellow";
    }
    else {
      color = "green";
    }
  
    // Add circles to map
L.circle([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]], {
  fillOpacity: 0.75,
  color: color,
  fillColor: color,
  // Adjust radius
  radius: data.features[i].properties.mag * 10000
}).bindPopup("<h1>" + data.features[i].properties.title + "</h1> <hr> <h3>Location: " + data.features[i].properties.place + "</h3>").addTo(myMap);

  }

  createFeatures(data.features); // createFeatures defined below. 
});

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place + 
      "</h3>" + "<hr>" + "<p>" + new Date(feature.properties.time) + "</p>"); 
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  createMap(earthquakes); // createMap defined below. 
}

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes // click at top right to display earthquakes. 
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  // var myMap = L.map("map", {
  //   center: [
  //     37.09, -95.71
  //   ],
  //   zoom: 5,
  //   layers: [streetmap, earthquakes]
  // });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(
    baseMaps, 
    overlayMaps, 
    {
    collapsed: false
  }).addTo(myMap);

  // var legend = L.control({
  //   position: "bottomright", // an error
  // });

  // legend.onAdd = function() {
  //   var div = L.DomUtil.create("div", "legend");
  //   return div;
  // };

  // legend.addTo(map);

}