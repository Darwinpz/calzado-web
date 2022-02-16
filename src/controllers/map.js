let myMap = L.map('myMap').setView([-3.47223, -80.23484], 17)

L.tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`, {
	maxZoom: 18,
}).addTo(myMap);

let marker = L.marker([-3.47223, -80.23484]).addTo(myMap).bindPopup("Calzados Ivan Lafebre")

let iconMarker = L.icon({
    iconSize: [60, 60],
    iconAnchor: [30, 60] 
})

addMarkers(popup= ~paste("Hola mundo", size) ) 

myMap.doubleClickZoom.disable()
myMap.on('dblclick', e => {
  let latLng = myMap.mouseEventToLatLng(e.originalEvent);

  L.marker([latLng.lat, latLng.lng], { icon: iconMarker }).addTo(myMap).bindPopup("Hola")
  L.addMarkers(popup="Hola mundo")
})
 