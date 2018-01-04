function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'google_maps.json', true); 
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            var responseText = xobj.responseText;
            // Parse JSON string into object
            var actual_JSON = JSON.parse(responseText);
            callback(actual_JSON);
        }
    };
    xobj.send(null);  
}

function viewJSON() {
    loadJSON(function(response) {
        /* Aqui l'objecte response representa l'objecte JSON que ens 
           ha retornat el servidor */
           var acomular=""; // Necesitamos una variable que nos vaya acomulando los resultados del sgte "for"
           
           for (i in response.results){
            var respuesta=response.results[i];
            var tipos = "";
                for (t in respuesta.types) { // Con este for lo que hacemos es recorrer los tipos de los restaurantes.
                tipos = tipos+"<ul class= 'list-group'>"+"<li class= 'list-group-item'>"+respuesta.types[t]+"</li>"+"</ul>";
            
                }
           

            acomular= acomular+"<div class= 'sm-well'>"+"<table class='table table-striped'>"+"<tr>"+"<th>"+"<h3>"+respuesta.name+"<img src= '"+ respuesta.icon+" '>"+"</h3>"+"</th>"+
            "<th>"+"LATITUD"+"</th>"+
            "<th>"+"LONGITUD"+"</th>"+"<th>"+"TIPOS"+"</th>"+"</tr>"
            +"<tr>"+"<td>"+respuesta.vicinity+
            "</td>"+"<td>"+respuesta.geometry.location.lat+"</td>"+"<td>"+respuesta.geometry.location.lng+"</td>"+
            "<td>"+tipos+"</td>"+"</tr>"+"</table>"+"</div>";  // el div nos sirve para que las casillas de las tablas no sean tan amplias               
           }
           document.getElementById("results").innerHTML =acomular; // con esto hacemos que el código se escriba en el html
    });
}

