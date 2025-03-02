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

btn_trees.addEventListener("click",
    async () =>{
        let response= await fetch('arboles_ingles.geojson');
        let datos= await response.json();

        //Agregar la capa al mapa

        L.geoJSON(datos, 
            {
                pointToLayer: (feature, latlong)=>{                    
                    return L.circleMarker(latlong,{
                        radius:5,
                        fillColor:'green',
                        color: 'green',
                        weight:1,
                        opacity:1,
                        fillOpacity: 0.5,
                    })
                }
            }
        ).addTo(map)
    }
)

let btn_distance = document.getElementById("btn_distance");

btn_distance.addEventListener("click",
    async () =>{
        let response= await fetch('arboles_ingles.geojson');
        let datos= await response.json();
        let trees=datos.features.map((myElement,index)=>({
            id: index+1,
            coordinates:  myElement.geometry.coordinates
        }));

        console.log(trees);

        let distances = [];

        trees.forEach((tree_a)=>{trees.forEach
            (
                (tree_b)=>{
                if (tree_a.id != tree_b.id){}
                //Calcular distancias entre arbol a y b

                let distance = turf.distance(
                    turf.point(tree_a.coordinates),
                    turf.point(tree_b.coordinates),
                );

                distances.push(
                    [
                        `Árbol ${tree_a.id}`,
                        `Árbol ${tree_b.id}`,
                        distance.toFixed(3)
                    ]
                )
            }
            )
        }
        )
        generatePDF(distances, trees.lenght);
    }
)


function generatePDF(distances, total_trees) {
    let { jsPDF } = window.jspdf;
    let documentPDF = new jsPDF();

    documentPDF.setFontSize(16);
    documentPDF.text("Reporte de árboles en el barrio Inglés", 105, 15, { align: "center" });

    documentPDF.autoTable({
        startY: 35,
        head: [['Árbol 1', 'Árbol 2', 'Distancia (m)']],
        body: distances,
        theme: 'striped', 
        styles: { fontSize: 10 },
        headStyles: { fillColor: [22, 160, 133] } 
    });

    documentPDF.save("Reporte_Barrio_Ingles.pdf");
}

let btn_accidents = document.getElementById("btn_accidents");

btn_accidents.addEventListener("click",
    async () =>{
        let response= await fetch('siniestros_ingles.geojson');
        let datos= await response.json();

        //Agregar la capa al mapa

        L.geoJSON(datos, 
            {
                pointToLayer: (feature, latlong)=>{                    
                    return L.circleMarker(latlong,{
                        radius:5,
                        fillColor:'red',
                        color: 'black',
                        weight:1,
                        opacity:1,
                        fillOpacity: 0.5,
                    })
                }
            }
        ).addTo(map)
    }
)