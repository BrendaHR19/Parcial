var map = L.map('map').setView([4.584189116128292, -74.12381702974258], 17);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


async function load_polygon(){

    let my_data = await fetch('ingles.geojson');
    let my_polygon = await my_data.json();
    
    L.geoJSON(my_polygon, 
        {
            style: {
                color: 'purple'
            }
        }
    ).addTo(map)
}

load_polygon();

let btn_trees = document.getElementById("btn_trees");

btn_trees.addEventListener("click", ()=> alert("hola"))


async function load_trees(){

    let my_data = await fetch('arboles_ingles.geojson');
    let my_polygon = await my_data.json();
    
    L.geoJSON(my_polygon, 
        {
            style: {
                color: 'green'
            }
        }
    ).addTo(map)
}

load_trees();