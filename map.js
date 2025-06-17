'use strict'
console.log('Loaded map.js')

// 여기 본인의 Mapbox Access Token을 입력
mapboxgl.accessToken = 'pk.eyJ1IjoiamF5Y2VrIiwiYSI6ImNtYzBqc2ljbzAzOHgybW9kNHdneHRtazUifQ.mw-ealCPL1h6YPedUhlKBg'

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-73.94829, 40.80781],
  zoom: 13.75
});

// GeoJSON 데이터 URL
var blocks_url = "./data/blocks_joined_trees_um.geojson";
var trees_url = "./data/2015_Street_Tree_Census_subset_um.geojson";

// 데이터 로드 및 레이어 추가
map.on('load', function() {

  // 폴리곤 데이터 소스 추가 (blocks)
  map.addSource('blocks_data', {
    'type': 'geojson',
    'data': blocks_url
  });

  // 폴리곤 레이어 추가 및 스타일링
  map.addLayer({
    'id': 'blocks',
    'type': 'fill',
    'source': 'blocks_data',
    'paint': {
      'fill-color': ['case',
        ['==', ['get', 'avg_diamet'], null], 'white',
        ['step', ['get', 'avg_diamet'],
          '#ffffff',
          2.615, '#edf8e9',
          6.444, '#bae4b3',
          9.379, '#74c476',
          15.036, '#31a354',
          26.000, '#006d2c'
        ]
      ],
      'fill-outline-color': '#000000',
      'fill-opacity': 0.5
    }
  });

  // 포인트 데이터 소스 추가 (trees)
  map.addSource('trees_data', {
    'type': 'geojson',
    'data': trees_url
  });

  // 포인트 레이어 추가 및 스타일링
  map.addLayer({
    'id': 'trees',
    'type': 'circle',
    'source': 'trees_data',
    'paint': {
      'circle-color': '#349f27',
      'circle-opacity': 0.7,
      'circle-radius': ['/', ['get', 'tree_dbh'], 5]
    }
  });

});

// 나무 클릭시 팝업으로 종 이름 표시
map.on('click', 'trees', function(e) {
  var coordinates = e.features[0].geometry.coordinates.slice();
  var species = e.features[0].properties.spc_common;

  new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML(species)
    .addTo(map);
});

// 마우스가 나무 위에 있으면 포인터 모양
map.on('mouseenter', 'trees', function() {
  map.getCanvas().style.cursor = 'pointer';
});

// 마우스가 나무 벗어나면 원래 모양으로
map.on('mouseleave', 'trees', function() {
  map.getCanvas().style.cursor = '';
});
