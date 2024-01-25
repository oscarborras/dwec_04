////////////////////////////////////////////////////////////////////
// Cuando el documento esté cargado llamamos a la función iniciar().
////////////////////////////////////////////////////////////////////
window.addEventListener("load",iniciar);
/////////////////////////////////////////////////////////

function iniciar()
{
	// Creamos un objeto XHR.
	miXHR = new XMLHttpRequest;	
	
	// Cargamos los datos XML de forma asíncrona.
	// En este caso ponemos una página PHP que nos devuelve datos en formato XML

	cargarAsync("datosxml.php");

	// pero podríamos poner también el nombre de un fichero XML directamente: catalogo.xml
	// Se adjunta ejemplo de fichero XML.
	//cargarAsync("catalogo.xml");
}

function crearImagen(src){
	let imagen = document.createElement("img");
	imagen.src=src;
	imagen.id=1;
	document.getElementById("indicador").appendChild(imagen);
}

/////////////////////////////////////////////////////////
// Función cargarAsync: carga el contenido de la url
// usando una petición AJAX de forma ASINCRONA.
/////////////////////////////////////////////////////////
function cargarAsync(url) 
{ 
	if (miXHR) 
	{	
		// Activamos el indicador Ajax antes de realizar la petición.
		crearImagen("ajax-loader.gif");
		
		//Si existe el objeto  miXHR
		miXHR.open('GET', url, true); //Abrimos la url, true=ASINCRONA 
		
		// En cada cambio de estado(readyState) se llamará a la función estadoPeticion
		miXHR.onreadystatechange = estadoPeticion;
	
		// Hacemos la petición al servidor. Como parámetro: null ya que los datos van por GET
		miXHR.send(null);
	}
}

/////////////////////////////////////////////////////////
// Función estadoPeticion: será llamada a cada cambio de estado de la petición AJAX
// cuando la respuesta del servidor es 200(fichero encontrado) y el estado de
// la solicitud es 4, accedemos a la propiedad responseText
/////////////////////////////////////////////////////////

function tabla(){
	tabla = document.createElement("table");
	var tr = document.createElement("tr");
	for(let i=0;i<3;i++){
		let th = document.createElement("th");
		switch(i){
			case 0:
				let titulo = document.createTextNode("Titulo");
				th.appendChild(titulo);
				tr.appendChild(th);
			break;

			case 1:
				let Artista = document.createTextNode("Artista");
				th.appendChild(Artista);
				tr.appendChild(th);
			break;
			
			case 2:
				let Anno = document.createTextNode("Año");
				th.appendChild(Anno);
				tr.appendChild(th);
			break;
		}		
	}
	tabla.appendChild(tr);
	return tabla;
}

function estadoPeticion()
{
	if (this.readyState==4 && this.status == 200)
	{
		// Almacenamos el fichero XML en la variable datos.
		var datos=this.responseXML;
		
		// Tenemos que recorrer el fichero XML empleando los métodos del DOM
		// Array que contiene todos los CD's del fichero XML
		CDs= datos.documentElement.getElementsByTagName("CD");
		
		// En la variable salida compondremos el código HTML de la tabla a imprimir.
		//salida="<table border='1'><tr><th>Titulo</th><th>Artista</th><th>Año</th></tr>";
		salida = tabla();
		
		// Hacemos un bucle para recorrer todos los elementos CD.
		for (i=0;i<CDs.length;i++)
		{
			let tr = document.createElement("tr");			
			salida.appendChild(tr);
			//salida+="<tr>";
			
			// Para cada CD leemos el título
			titulos=CDs[i].getElementsByTagName("TITLE");
			
			try	// Intentamos imprimir el contenido de ese elemento
				{
					let td = document.createElement("td");
					let texto = document.createTextNode(titulos[0].firstChild.nodeValue);
					td.appendChild(texto);
					salida.appendChild(td);
					//salida+="<td>" + titulos[0].firstChild.nodeValue + "</td>";
				}
			catch (er)	// En el caso de que no tenga contenido ese elemento, imprimimos un espacio en blanco
				{
					let td = document.createElement("td");
					let texto = document.createTextNode("");
					td.appendChild(texto);
					salida.appendChild(td);
					//salida+= "<td>&nbsp;</td>";
				}
				
			// Para cada CD leemos el Artista
			titulos=CDs[i].getElementsByTagName("ARTIST");
			try	// Intentamos imprimir el contenido de ese elemento
				{
					let td = document.createElement("td");
					let texto = document.createTextNode(titulos[0].firstChild.nodeValue);
					td.appendChild(texto);
					salida.appendChild(td);
					//salida+="<td>" + titulos[0].firstChild.nodeValue + "</td>";
				}
			catch (er)	// En el caso de que no tenga contenido ese elemento, imprimimos un espacio en blanco
				{
					let td = document.createElement("td");
					let texto = document.createTextNode("");
					td.appendChild(texto);
					salida.appendChild(td);
					//salida+="<td>&nbsp;</td>";
				}
				
			// Para cada CD leemos el Año
			titulos=CDs[i].getElementsByTagName("YEAR");
			try	// Intentamos imprimir el contenido de ese elemento
				{
					let td = document.createElement("td");
					let texto = document.createTextNode(titulos[0].firstChild.nodeValue);
					td.appendChild(texto);
					salida.appendChild(td);
					//salida+="<td>" + titulos[0].firstChild.nodeValue + "</td>";
				}
			catch (er)	// En el caso de que no tenga contenido ese elemento, imprimimos un espacio en blanco
				{
					let td = document.createElement("td");
					let texto = document.createTextNode("");
					td.appendChild(texto);
					salida.appendChild(td);
					//salida+="<td>&nbsp;</td>";
				}
			
			// Podríamos seguir sacando más campos del fichero XML..
			
			// Cerramos la fila.			
			//salida+="</tr>";
		}
		
		// Cuando ya no hay más Cd's cerramos la tabla.
		//salida+="</table>";
		
		// Desactivamos el indicador AJAX cuando termina la petición
		document.getElementById("indicador").removeChild(document.getElementById("indicador").childNodes[0]); 
		
		// Imprimimos la tabla dentro del contenedor resultados.
		//document.getElementById("resultados").removeChild(document.getElementById("resultados").childNodes[0]);
		document.getElementById("resultados").appendChild(salida);
	}
}