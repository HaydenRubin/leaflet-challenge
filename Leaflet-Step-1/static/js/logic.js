// Creating map object
var myMap = L.map("map", {
    center: [37, -122],
    zoom: 10
  });

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"

d3.json(url, function (response) {

    // var markers = L.markerClusterGroup(); don't want clusters. 

    for (var i = 0; i < response.features.length; i++) {

        var coordinates = response.features[i].geometry;

        if (coordinates) {
            markers.addLayer(L.marker([ // marker undefined, because don't want ClusterGroup. 
                coordinates.coordinates[1], 
                coordinates.coordinates[0]])
        .bindPopup(response.features[i].properties.title));

        }

    }

    myMap.addLayer(markers);

    var legend = L.control({
        position: "bottomright",
    });

    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "legend");
        return div;
      };
      // Add the info legend to the map
      legend.addTo(map);


})