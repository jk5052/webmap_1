'use strict'
console.log('Loaded map.js')

// 본인의 Mapbox 토큰
mapboxgl.accessToken = 'pk.eyJ1IjoiamF5Y2VrIiwiYSI6ImNtYzB0N2RsdzA2MXgya3IzbGM1OTg0bTMifQ.2iyCIDuQTc7gkqtgG6f3Ew'

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-73.94829, 40.80781],
  zoom: 13.75
});

// 절대경로로 데이터 로딩
var blocks_url = "https://jk5052.github.io/webmap_1/data/blocks_joined_trees_um.geojson";
var trees_url = "https://jk5052.github.io/webmap_1/data/2015_Street_Tree_Census_subset_um.geojson";

map.on('load', function() {

  // 폴리곤 데이터 (blocks)
  map.addSource('blocks_data', {
    'type': 'geojson',
    'data': blocks_url
  });

  // 폴리곤 레이어 추가 및 색상 적용
  map.addLayer({
    'id': 'blocks',
    'type': 'fill',
    'source': 'blocks_data',
    'paint': {
      'fill-color': '#74c476', // 기본 색상(초록색)
      'fill-opacity': 0.4,     // 투명도 설정
      'fill-outline-color': '#000000' // 외곽선 색상
    }
  });

  // 포인트 데이터 (trees)
  map.addSource('trees_data', {
    'type': 'geojson',
    'data': trees_url
  });

  // 포인트 레이어 추가 (가장 위로)
  map.addLayer({
    'id': 'trees',
    'type': 'circle',
    'source': 'trees_data',
    'paint': {
      'circle-color': '#349f27',
      'circle-opacity': 0.8,
      'circle-radius': ['/', ['get', 'tree_dbh'], 5]
    }
  });

});

// 나무 클릭 시 팝업으로 종 이름 표시
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

// 마우스가 나무를 벗어나면 원래 모양으로
map.on('mouseleave', 'trees', function() {
  map.getCanvas().style.cursor = '';
});


