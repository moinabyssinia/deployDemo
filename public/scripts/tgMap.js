console.log("connected!")
const lon = document.querySelector(".lon");
const lat = document.querySelector(".lat");

console.log(lat.textContent);

// adding layer definition
const mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWljaGFlbGd0YWRlc3NlIiwiYSI6ImNrcGI5ZnBwNjA0OHYydnIzcTk0N3c0em0ifQ.jbKBBNxF3jk2KFDQ1GSq3A';

const streets   = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', attribution: mbAttr}),
      satellite  = L.tileLayer(mbUrl, {id: 'mapbox/satellite-v9', attribution: mbAttr})


const map = L.map('mapid', {
    center: [Number(lat.textContent), Number(lon.textContent)],
    zoom: 5,
    layers: [streets] // one of the layers needs to be default
});

const baseLayers = {
    "Streets": streets,
    "Satellite": satellite
    
};

L.control.layers(baseLayers).addTo(map);


const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [18, 30],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  

L.marker([Number(lat.textContent), Number(lon.textContent)], {icon: redIcon}).addTo(map);

