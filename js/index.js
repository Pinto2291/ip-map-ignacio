import { get_ip } from "./iptrack.js";

/* Buttons and input */
const input_ip = document.getElementById('input_ip');
const btn_ip = document.getElementById('btn_ip');

/* Latitude and longitude */
const country = document.getElementById('country');
const region = document.getElementById('region');
const city = document.getElementById('city');
const postal_code = document.getElementById('postal_code');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');

let lat_inicial = 10.4860;
let lon_inicial = -66.8964;

/* Initial map wit default caracas coordinates */

let map = L.map('map').setView([lat_inicial, lon_inicial], 13);

    /* layer del mapa */

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

    /* Marker tipo circulo */

    let circle = L.circle([lat_inicial, lon_inicial], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500
    }).addTo(map);

    circle.bindPopup(`Latitude: ${lat_inicial}, Longitude: ${lon_inicial}`);


/* Map function */

function render_map(lat, lon) {
    // Update the map view with the new latitude and longitude
    map.setView([lat, lon], 13);
  
    // Remove the existing circle marker
    circle.remove();
  
    // Add a new circle marker with the updated latitude and longitude
    circle = L.circle([lat, lon], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(map);
  
    circle.bindPopup(`Latitude: ${lat}, Longitude: ${lon}`);
}

/* Search ip function y event listener */

btn_ip.addEventListener('click', () => {
    get_ip(input_ip.value)
    .then(response => {

        /* Console log de la respuesta de la API */
        console.log(response);

        /* Latitude, longitude and other values */
        let latitude_value = response.location.lat;
        let longitude_value = response.location.lng;
        let region_value = response.location.region;
        let city_value = response.location.city;

        /* DOM manipulation to add more info to the elements */

        /* pais y region */
        country.innerText = ` ${response.location.country}`;
        region.innerText = ` ${response.location.region}`;
        city.innerText = ` ${city_value}`

        /* Codigo postal */
        postal_code.innerText =  ` ${response.location.postalCode ? response.location.postalCode : 'n/a'}`;

        /* Latitude y longitud */
        latitude.innerText = ` ${response.location.lat}`;
        longitude.innerText = ` ${response.location.lng}`;

        /* Creacion del mapa */

        /* 190.120.250.39 */

        render_map(latitude_value, longitude_value)

    })
    .catch(error => {console.log(error)});
});