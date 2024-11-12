//id="btnBuscar"
//id="inputBuscar"
//id="contenedor"
document.getElementById("btnBuscar").addEventListener("click", () =>{
    const query = document.getElementById("inputBuscar").value;
    fetch(`https://images-api.nasa.gov/search?q=${query}`)
        .then(response => response.json())
        .then(data => mostrarResultados(data.collection.items))
        .catch(error => console.error("Error al obtener los datos:", error));
})

function mostrarResultados(items) {
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = ""; // Limpiar resultados previos

    items.forEach(item => {
        // Desestructurar datos
        const { title, description, description_508, date_created } = item.data[0];
        const imageUrl = item.links ? item.links[0].href : ""; // Verificar que el enlace de la imagen existe

        // Elegir la descripción más adecuada
        const desc = description || description_508 || "No description available";

        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-4");

        card.innerHTML = `
            <div class="card h-100">
                <img src="${imageUrl}" class="card-img-top" alt="${title}">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${desc}</p>
                    <p class="card-text"><small class="text-muted">${new Date(date_created).toLocaleDateString()}</small></p>
                </div>
            </div>
        `;

        contenedor.appendChild(card);
    });
}
