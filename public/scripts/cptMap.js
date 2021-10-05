
/* get link for the geojson file */
const cptGeoJson = "https://raw.githubusercontent.com/moinabyssinia/gssrDB/main/public/data/twcr_era20c_cpt.geojson"

// adding layer definition
const mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWljaGFlbGd0YWRlc3NlIiwiYSI6ImNrcGI5ZnBwNjA0OHYydnIzcTk0N3c0em0ifQ.jbKBBNxF3jk2KFDQ1GSq3A';

const streets   = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', attribution: mbAttr, tileSize: 512, zoomOffset: -1}),
      satellite  = L.tileLayer(mbUrl, {id: 'mapbox/satellite-v9', attribution: mbAttr})



const map = L.map('mapid', {
    center: [15, 0],
    zoom: 2.0,
    layers: [streets] // one of the layers needs to be default
});


// add the new control to the map
// L.Control.zoomHome().addTo(map);

const baseLayers = {
    "Streets": streets,
    "Satellite": satellite
    
};

L.control.layers(baseLayers).addTo(map);

const icon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/moinabyssinia/gssr/gh-pages/circle-48.png',
    iconSize: [15, 15]
  });
  


fetch(cptGeoJson)
    .then(
        res => res.json()
    )
    .then(
        data => L.geoJSON(data, {
            pointToLayer: function(feature, latlng){
                const marker = L.marker(latlng, {icon: icon})

                // define popup text
                let popupText = `Tide Gauge: ${feature.properties.tg}` + `<br>`
                popupText += `observation length: ${feature.properties.obsRecordLength_x}` + `<br>`
                popupText += `gssrERA20C CPT: ${feature.properties.era20c_vi}` + `<br>`
                popupText += `gssrERA20C length: ${feature.properties.era20c_recLen}` + `<br>`
                popupText += `gssrERA20C extention: ${feature.properties.era20c_yrsGained}` + `<br>`
                popupText += `gssr20CR CPT: ${feature.properties.twcr_vi}` + `<br>`
                popupText += `gssr20CR length: ${feature.properties.twcr_recLen}` + `<br>`
                popupText += `gssr20CR extention: ${feature.properties.twcr_yrsGained}` + `<br>`
                
                // add popup 
                marker.bindPopup(popupText)

                return marker;
            }
        }).addTo(map)
    )