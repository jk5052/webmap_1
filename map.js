'use strict'
console.log('Loaded map.js')

// 본인의 Mapbox Token 입력
mapboxgl.accessToken = 'pk.eyJ1IjoiamF5Y2VrIiwiYSI6ImNtYzB0N2RsdzA2MXgya3IzbGM1OTg0bTMifQ.2iyCIDuQTc7gkqtgG6f3Ew'

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-73.94829, 40.80781],
  zoom: 13.75
});

var blocks_url = "https://jk5052.github.io/webmap_1/data/blocks_joined_trees_um.geojson";
var trees_url = "https://jk5052.github.io/webmap_1/data/2015_Street_Tree_Census_subset_um.geojson";

map.on('load', function() {
  map.addSource('blocks_data', {
    'type': 'geojson',
    'data': blocks_url
  });

  map.addLayer({
    'id': 'blocks',
    'type': 'fill',
    'source': 'blocks_data',
    'paint': {
      'fill-color': '#74c476',
      'fill-opacity': 0.4,
      'fill-outline-color': '#000000'
    }
  });

  map.addSource('trees_data', {
    'type': 'geojson',
    'data': trees_url
  });

  map.addLayer({
    'id': 'trees',
    'type': 'circle',
    'source': 'trees_data',
    'paint': {
      'circle-color': '#349f27',
      'circle-opacity': 0.8,
      'circle-radius': ['max', ['/', ['get', 'tree_dbh'], 2], 4]
    }
  });

});

// 클릭 팝업 기능 필수 추가
map.on('click', 'trees', function(e) {
  var coordinates = e.features[0].geometry.coordinates.slice();
  var species = e.features[0].properties.spc_common;

  new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML(`<strong>Species:</strong> ${species}`)
    .addTo(map);
});

// 커서 변경 기능 필수 추가
map.on('mouseenter', 'trees', function() {
  map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'trees', function() {
  map.getCanvas().style.cursor = '';
});



