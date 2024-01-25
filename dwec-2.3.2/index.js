window.addEventListener("load",iniciar);

function iniciar(){
    //Creamos el objeto XHR
    miXHR = new XMLHttpRequest();

    //Sí el objeto XHR se crea correctamente:
    if (miXHR) {

        alert("Comenzamos la petición AJAX");

        //Preparamos la conexión AJAX, SINCRONA en este caso.
        miXHR.open('GET', "fecha.php", false);

        //Hacemos la petición al servidor.
        miXHR.send(null);

        //Obtenemos el objeto resultados y borramos sus hijos.
        let objeto = document.getElementById("resultados");
        while(objeto.firstChild){
            objeto.removeChild(objeto.firstChild);
        }

        //Creamos un nodo de Texto en el que se incluya la respuesta del servidor.
        objeto.appendChild(document.createTextNode(miXHR.responseText));

        alert("Terminó la petición AJAX");
    }
}