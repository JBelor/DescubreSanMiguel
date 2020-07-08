
 var database = firebase.database();
 var nombreImagen;

 //Variables para mostrar comercio
var ImgComer;
var nombreComer;
var descripComer;
var key;

 //var ref = firebase.database().ref('Categoria').child('Comercio');
  //var Ref = database.ref("Categorías").child("Comercio");
  
  storageRef = firebase.storage().ref();
  imagenesRef = firebase.database().ref("Categorías").child("Comercio");


 function subirImagen() {

  	fichero = document.getElementById("imagen");
  	fichero.addEventListener("change", subirImagen, false);

  	var imagenASubir = fichero.files[0];

	var uploadTask = storageRef.child('Imagenes/' + imagenASubir.name).put(imagenASubir);


	uploadTask.on('state_changed', function(snapshot){
	  //se muestra el proceso de subida de imagen
	  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	  console.log('Upload is ' + progress + '% done');
	  switch (snapshot.state) {
	    case firebase.storage.TaskState.PAUSED: // or 'paused'
	      console.log('Upload is paused');
	      break;
	    case firebase.storage.TaskState.RUNNING: // or 'running'
	      console.log('Upload is running');
	      break;
	  }
	}, function(error) {
	  //gestionar errores
	  alert("Se produjo un error");
	}, function() {
	  //subida exitosa de la imagen
	  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
	    console.log('File available at', downloadURL);
		  //crearNodoEnBDFirebase(imagenASubir.name, downloadURL);
		  nombreImagen = imagenASubir.name;
	  });
	});
 }

 function crearNodoEnBDFirebase(nombreImagen, downloadURL){
 	//imagenesRef.child("Comercio").push({ Imagen-Nombre: nombreImagen, url: downloadURL });
 }

 //Muestra todas las imagenes de una carpeta
 function mostrarImagen(){
 	imagenesRef.on("value", function(snapshot){
 		var datos = snapshot.val();
 		var result = "";
 		for(var key in datos){
 			result += '<img width="100%" src="' + datos[key].img_url + '"/>';
 		}
 		document.getElementById("imagen-firebase").innerHTML = result;
 	})
 }

 function mostrarComercio2(){
 	firebase.database().ref("Categorías").child("Comercio").once("value", function(snapshot) {
	  //console.log(snapshot.val());
	  	var datos = snapshot.val();

		//var Result = "";
		for(var n in datos){
			ImgComer += '<img width="100%" src="' + datos[n].img_url + '"/>';
			nombreComer += datos[n].Nombre;
			descripComer += datos[n].Descripcion;
		}
			document.getElementById('comercio_img').innerHTML = ImgComer;
			document.getElementById("comercio_nombre").innerHTML = '<h4>' + nombreComer + '</h4>';
			document.getElementById("comercio_descrip").innerHTML = '<p>' + descripComer + '</p>';
			document.getElementById("bottons").innerHTML = "<a href='#' class='btn-primary'>Información</a><a href='#' class='btn-segundary'>Iniciar ruta</a>'";

		//document.getElementById('comercio_item').innerHTML = '<p>' + Result + '</p>';
		//NombreComer = snapshot[key].child("Nombre: ");
		//console.log(NombreComer);
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});
 }

 function nuevoLugar(){
 	//subirImagen();

 	fichero = document.getElementById("imagen");
  	fichero.addEventListener("change", subirImagen, false);

  	var imagenASubir = fichero.files[0];

	var uploadTask = storageRef.child('Imagenes/' + imagenASubir.name).put(imagenASubir);


	uploadTask.on('state_changed', function(snapshot){
	  //se muestra el proceso de subida de imagen
	  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	  console.log('Upload is ' + progress + '% done');
	  switch (snapshot.state) {
	    case firebase.storage.TaskState.PAUSED: // or 'paused'
	      console.log('Upload is paused');
	      break;
	    case firebase.storage.TaskState.RUNNING: // or 'running'
	      console.log('Upload is running');
	      break;
	  }
	}, function(error) {
	  //gestionar errores
	  alert("Se produjo un error");
	}, function() {
	  //subida exitosa de la imagen
	  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
	    console.log('Enlace de la imagen: ', downloadURL);

		//crearNodoEnBDFirebase(imagenASubir.name, downloadURL);
		
		nombreImagen = imagenASubir.name;
	 	firebase.database().ref("Categorías").child("Comercio").push({
	        Nombre: document.getElementById('nombreLug').value,
	        Descripcion: document.getElementById('descripLug').value,
	        Telefono: document.getElementById('telLug').value,
	        Whatsapp: document.getElementById('whatsLug').value,
	        Facebook: document.getElementById('fbUrlLug').value,
	        Instagram: document.getElementById('instaUrlLug').value,
	        Ubicacion: document.getElementById('ubicLug').value,
	        Imagenes: nombreImagen,
	        img_url: downloadURL
	  	});
	  	alert("Nuevo sitio registrado correctamente");
	  });
	});

 }

function mostrarComercio(key){
 	firebase.database().ref("Categorías").child("Comercio").orderByKey().once("value").then(function(snapshot) { 
 		snapshot.forEach(function(childSnapshot) { 
 		//key es el id de cada registro
 		this.key = childSnapshot.key;
 		var childData = childSnapshot.val();
 		var ImgComer = childSnapshot.val().img_url;
 		var nombreComer = childSnapshot.val().Nombre;
 		var descripComer = childSnapshot.val().Descripcion;

 		//console.log(key);
 		
 		$("#comercio_item").append(
 		'<div class="card"><img width="100%" heigth="80%" src="'
 		+ ImgComer +
 		'"/>'
 		);
 		$("#comercio_item").append(
 		'<div class="container" id="comercio_nombre"><h4>'
 		+ nombreComer
 		);
 		$("#comercio_item").append(
 		'</h4><hr><p>'
 		+ descripComer +
 		'</p>'
 		);
 		$("#comercio_item").append(
 		"<div class='container-buttons' id='bottons'><a href='informacion.html' class='btn-primary'>Informacion</a><a href='map.html' class='btn-segundary'>Iniciar ruta</a>'</div></div></div><br>"
 		);
 	});
 	}, function (errorObject) {
		console.log("The read failed: " + errorObject.code);
	});

 	return key;
	//console.log(key);
}

function mostrarInfo(key) {
	firebase.database().ref("Categorías").child("Comercio").orderByKey().once("value").then(function(snapshot) { 
		snapshot.forEach(function(childSnapshot) { 
		//key es el id de cada registro
		this.key = childSnapshot.key;
		var childData = childSnapshot.val();
		var ImgComer = childSnapshot.val().img_url;
		var nombreComer = childSnapshot.val().Nombre;
		var descripComer = childSnapshot.val().Descripcion;

		//console.log(key);
		
		$("#comercio_item").append(
		'<div class="card"><img width="100%" src="'
		+ ImgComer +
		'"/>'
		);
		$("#comercio_item").append(
		'<div class="container" id="comercio_nombre"><h4>'
		+ nombreComer
		);
		$("#comercio_item").append(
		'</h4><hr><p>'
		+ descripComer +
		'</p>'
		);
		$("#comercio_item").append(
		"<div class='container-buttons' id='bottons'><button onclick='mostrarInfo(key)' class='btn-primary'>Información</button><a href='map.html' class='btn-segundary'>Iniciar ruta</a>'</div></div></div><br>"
		);
	});
	}, function (errorObject) {
	   console.log("The read failed: " + errorObject.code);
   });

	return key;
}
