
window.addEventListener("load" , () => {

})



 var database = firebase.database();
 var nombreImagen;

 //Variables para mostrar comercio
var ImgComer;
var nombreComer;
var descripComer;
var keys;

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

 function nuevoLugar(){

	// Validar formulario
	var nombre = document.querySelector("#nombreLug").value;
	var descripcion = document.querySelector("#descripLug").value;
	var telefono = document.querySelector("#telLug").value;
	var wha = document.querySelector("#whatsLug").value;
	var fc = document.querySelector("#fbUrlLug").value;
	var insta = document.querySelector("#instaUrlLug").value;
	var ubi = document.querySelector("#ubicLug").value;
	var imagen = document.querySelector("#imagen").value;
	var RegExp_number= "/^\d{4}-\d{4}$/";
	var RegExp_url = "(/^HTTP|HTTP|http(s)?:\/\/(www\.)?[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,40}(:[0-9]{1,40})?(\/.*)?$/)";
	if(nombre === "" || descripcion === "" || imagen ===""){
		bootbox.alert({
			size: "small",
		    message: "<h4 class='txt-bootbox'>Todos los campos son requeridos</h4>",
		    closeButton: false,
		})
	}else{
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
		bootbox.alert({
		  size: "small",
		  message: "<h4 class='txt-bootbox'>Se produjo un error</h4>",
		  closeButton: false
		})
		//alert("Se produjo un error");
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
			//alert("Nuevo sitio registrado correctamente");
			bootbox.alert({
			  size: "small",
			  message: "<h4 class='txt-bootbox'>Nuevo sitio registrado correctamente</h4>",
			  closeButton: false,
			  callback: function(){ aComercio(); }
		  })
		});
	  });
	}

		
 }

//  Todas las Card de la Categoria Comercio
function mostrarComercio(){

	// Cuadro de carga
	var dialog = bootbox.dialog({
    title: 'Por favor espera',
    message: '<p style="background-color:white;color:black;"><i class="fa fa-spin fa-spinner"></i> Cargando...</p>',
	closeButton: false
	});           
	dialog.init(function(){
	    setTimeout(function(){
	        bootbox.hideAll(); 
	    
	 		firebase.database().ref("Categorías").child("Comercio").orderByKey().once("value").then(function(snapshot) { 
	 		snapshot.forEach(function(childSnapshot) { 
	 		//key es el id de cada registro
			    this.key = childSnapshot.key;
	 			var ImgComer = childSnapshot.val().img_url;
	 			var nombreComer = childSnapshot.val().Nombre;
			 	var descripComer = childSnapshot.val().Descripcion;
			 	var gps = childSnapshot.val().Ubicacion;
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
	 		'</h4><p>'
	 		+ descripComer +
	 		'</p>'
			 );
	 		$("#comercio_item").append(
		   '<div class="container-buttons" id="bottons"><button onclick="sessionStorage.setItem(\'key\', \''+key+'\');aInfo()" class="btn-primary">Información</button><button onclick="sessionStorage.setItem(\'ubicacion\', \''+gps+'\');aMap()" class="btn-secundary">Iniciar ruta</button></div></div></div><br>'		
		   );
		});
	 	}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
		});
 	}, 2500);
	});
}
// Mostrando Mas Informacion
function mostrarInfo() {
	var ob_key = sessionStorage.getItem("key");
	console.log(ob_key);
	firebase.database().ref('Categorías').child('Comercio').once("value").then(function(snapshot) {
		snapshot.forEach(function(childSnapshot) { 
				this.key = childSnapshot.key;
				var ImgComer = childSnapshot.val().img_url;
				var nombreComer = childSnapshot.val().Nombre;
				var descripComer = childSnapshot.val().Descripcion;
				var cel  = childSnapshot.val().Telefono;
				var gps = childSnapshot.val().Ubicacion;
				if(key == ob_key){
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
						'</h4><hr><p class="text-info">'
						+ descripComer+
						'</p>'
						);
						$("#comercio_item").append(
							'</h4><hr><p class="text-info"> Telefono : '
							  + cel +
							'</p>'
							);
						$("#comercio_item").append(
						'<ul class="referencias"><li><a href="https://www.facebook.com/">Facebook</a></li><li><a href="https://www.instagram.com/">Instagram</a></li><li><a <button id="bt_list" onclick="sessionStorage.setItem(\'ubicacion\', \''+gps+'\');aMap()">Iniciar ruta</button></a></li></ul></br>'
						);

						// <button id="bt_list" onclick="sessionStorage.setItem(\'ubicacion\', \''+gps+'\');aMap()">Iniciar ruta</button>
				}
	});
	}, function (errorObject) {
	   console.log("The read failed: " + errorObject.code);
   });
}

function aInfo(){
	location.href="informacion.html";
}
function aMap(){
	location.href="map.html";
}
function aComercio(){
	location.href="Comercio.html";
}