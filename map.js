'use strict';
console.log('Loaded map.js');

mapboxgl.accessToken = 'pk.eyJ1IjoiamF5Y2VrIiwiYSI6ImNtYzBqc2ljbzAzOHgybW9kNHdneHRtazUifQ.mw-ealCPL1h6YPedUhlKBg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-73.93324, 40.80877],
    zoom: 14
});
