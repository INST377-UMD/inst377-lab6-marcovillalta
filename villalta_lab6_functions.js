function createMap() {
    var map = L.map('map').setView([37.5, -95], 4);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 50,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    addMarkers(map);
}

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

function addMarkers(map) {
    const lat1 = getRandomInRange(30, 35, 3);
    const lat2 = getRandomInRange(30, 35, 3);
    const lat3 = getRandomInRange(30, 35, 3);
    
    const lon1 = getRandomInRange(-90, -100, 3);
    const lon2 = getRandomInRange(-90, -100, 3);
    const lon3 = getRandomInRange(-90, -100, 3);

    lats = [lat1, lat2, lat3];
    lons = [lon1, lon2, lon3];

    lats.forEach((latitude, index) => {
        const longitude = lons[index]
        L.marker([latitude, longitude]).addTo(map)
        
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            .then((res) => res.json())
            .then((info) => {
                const locality = info.locality;
                document.getElementById(`marker${index+1}`).innerHTML = `Marker ${index+1}: Latitude: ${latitude}, Longitude: ${longitude}`;
                document.getElementById(`locality${index+1}`).innerHTML = `Locality: ${locality}`;
            })
    });
}

window.onload = createMap();