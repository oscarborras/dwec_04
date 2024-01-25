////////////////////////////////////////////////////////////////////
// Cuando el documento esté cargado llamamos a la función iniciar().
////////////////////////////////////////////////////////////////////
window.addEventListener("load",iniciar);

/////////////////////////////////////////////////////////

function iniciar()
{
	// Creamos un objeto XHR.
	miXHR = new XMLHttpRequest();
	
	// Cargamos en el objeto con ID resultados el contenido 
	// del fichero datos.txt empleando una petición AJAX.
	cargarAsync(document.getElementById("resultados"),"fecha.php");
}

/////////////////////////////////////////////////////////
// Función cargarSync: carga el contenido de la url
// en el objeto que se le pasa como referencia,
// usando una petición AJAX de forma ASINCRONA.
/////////////////////////////////////////////////////////
function cargarAsync(objeto, url) 
{ 
	if (miXHR) 
	{	
		alert("Comenzamos la petición AJAX");

		//Si existe el objeto  miXHR
		miXHR.open('GET', url, true); //Abrimos la url, true=ASINCRONA 
		
		// Hacemos la petición al servidor. Como parámetro:
		// null -> cuando usamos GET.
		// cadena con los datos -> cuando usamos POST
		miXHR.send(null);
		
		//Escribimos la respuesta recibida de la petición AJAX en el objeto DIV
		let objeto = document.getElementById("resultados");
        while (objeto.firstChild) {
            objeto.removeChild(objeto.firstChild); // Eliminamos todos los hijos de ese objeto.
		}
		
		// Cuando ya no tenga hijos, agregamos un hijo con el texto que recibe la función.
		objeto.appendChild(document.createTextNode(miXHR.responseText)); 
		
		alert("Terminó la petición AJAX");
	}
}