var numTel;

 var database = firebase.database();
 var nombreImagen;

 //Variables para mostrar comercio
var ImgComer;
var nombreComer;
var descripComer;
var keys;

 //var ref = firebase.database().ref('Categoria').child('Comercio');
  //var Ref = database.ref("Categorias").child("Comercio");
  
  storageRef = firebase.storage().ref();
  imagenesRef = firebase.database().ref("Categorias").child("Comercio");


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

 function ayuda(){
	bootbox.confirm({
		message: "<h4 class='txt-bootbox'><strong>Se recomienda entrar a Google Maps y obtener la ubicacion de ahí</strong></h4>",
	    buttons: {
	        confirm: {
	            label: 'Abrir Google Maps',
	            className: 'btn-primary'
	        },
	        cancel: {
	            label: 'Ahora no',
	            className: 'btn-danger'
	        }
	    },
	    callback: function (result) {
	        if (result==true) {
	        	window.location.href="https://www.google.com/maps"
	        }else{
	        	bootbox.hideAll();
	        }
	    }
		});
 }
 //Formulario para agregar un nuevo lugar segun la categoria
 function nuevoLugar(){
	// Validar formulario
	var nombre = document.querySelector("#nombreLug").value;
	var descripcion = document.querySelector("#descripLug").value;
	var telefono = document.querySelector("#telLug").value;
	var wha = document.querySelector("#whatsLug").value;
	var fc = document.querySelector("#fbUrlLug").value;
	var insta = document.querySelector("#instaUrlLug").value;
	var web = document.querySelector("#webUrlLug").value;
	var ubi = document.querySelector("#ubicLug").value;
	var imagen = document.querySelector("#imagen").value;
	var RegExp_img = /\.(jpg|png)$/i;
	var RegExp_url = /^(ftp|http|https):\/\/[^ "]+$/;
	var RegExp_gps = /^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/;
	// Validando que todos los campos requeridos este llenos 
	if(nombre === ""){
		bootbox.alert({
			size: "small",
		    message: "<h4 class='txt-bootbox'>El campo <strong>Nombre</strong> es requerido</h4>",
		    closeButton: false,
		})
	}else if( descripcion === ""){
		bootbox.alert({
			size: "small",
		    message: "<h4 class='txt-bootbox'>El campo <strong>Descripcion</strong> es requerido</h4>",
		    closeButton: false,
		})
	}else if(telefono ===""){
		bootbox.alert({
			size: "small",
		    message: "<h4 class='txt-bootbox'>El campo <strong>Telefono</strong> es requerido</h4>",
		    closeButton: false,
		})
	}else if( ubi.length < 0 || ubi ===""){
		bootbox.alert({
			size: "small",
		    message: "<h4 class='txt-bootbox'>El campo <strong>Ubicacion</strong> es requerido</h4>",
		    closeButton: false,
		})
	}else if(imagen ==="" ){
		bootbox.alert({
			size: "small",
		    message: "<h4 class='txt-bootbox'>El campo <strong>Imagen</strong> es requerido</h4>",
		    closeButton: false,
		})
	}else if(telefono != "" && telefono.length !== 8){
			bootbox.alert({ //Validando el campo Telefono
				size: "small",
				message: "<h4 class='txt-bootbox'>El <strong>telefono</strong> debe tener 8 digitos</h4>",
				closeButton: false,
			})
	 }else if(wha != "" && wha.length !== 8){
				bootbox.alert({ //Validando el campo Whatsapp
					size: "small",
					message: "<h4 class='txt-bootbox'>El <strong>Whatsapp</strong> debe tener 8 digitos</h4>",
					closeButton: false,
				})
		}else if(fc != "" && RegExp_url.test(fc) == false){
					bootbox.alert({ //Validando el campo Facebook
						size: "small",
						message: "<h4 class='txt-bootbox'>La URL del campo <strong>FACEBOOK</strong> es incorrecto</h4>",
						closeButton: false,
					})
			}else if(insta != "" && RegExp_url.test(insta) == false){
						bootbox.alert({	//Validando el campo Instagram
							size: "small",
							message: "<h4 class='txt-bootbox'>La URL del campo <strong>INSTAGRAM</strong> es incorrecto</h4>",
							closeButton: false,
						})
				}else if(web != "" && RegExp_url.test(web) == false){
							bootbox.alert({	//Validando el campo Web
								size: "small",
								message: "<h4 class='txt-bootbox'>La URL del campo <strong>WEB</strong> es incorrecto</h4>",
								closeButton: false,
							})	
					}else if(ubi != "" && RegExp_gps.test(ubi) == false){
						bootbox.alert({	//Validando el campo Web
							size: "small",
							message: "<h4 class='txt-bootbox'>La coordenada del campo <strong>UBICACION</strong> es incorrecto</h4>",
							closeButton: false,
						})	
					}else if(imagen != "" && RegExp_img.test(imagen) == false){
								bootbox.alert({	//Validando el campo Imagen
									size: "small",
									message: "<h4 class='txt-bootbox'>La imagen debe ser <strong>.jpg</strong> o <strong>.png</strong></h4>",
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
								   firebase.database().ref("Categorias").child(sessionStorage.getItem("categoriaNom")).push({
									  Nombre: document.getElementById('nombreLug').value,
									  Descripcion: document.getElementById('descripLug').value,
									  Telefono: document.getElementById('telLug').value,
									  Whatsapp: document.getElementById('whatsLug').value,
									  Facebook: document.getElementById('fbUrlLug').value,
									  Instagram: document.getElementById('instaUrlLug').value,
									  Web: document.getElementById('webUrlLug').value,
									  Ubicacion: ubi,
									  Imagenes: nombreImagen,
									  img_url: downloadURL
									});
									//alert("Nuevo sitio registrado correctamente");
									bootbox.alert({
									  size: "small",
									  message: "<h4 class='txt-bootbox'>Nuevo sitio registrado correctamente</h4>",
									  closeButton: false,
									  callback: function(){ 
									  	//Funcion para redireccionar segun la categoria
									  	location.href="Lugar.html";
									  }
								  })
								});
							  });
							}	
						 }//fin de la funcion

// <--------------- Todas las Card segun categoria seleccionada ------------>
function mostrarLugar(){
	document.getElementById("nombreCat").innerHTML = sessionStorage.getItem("categoriaNom");
	// Cuadro de carga
	var dialog = bootbox.dialog({
    title: 'Por favor espera',
    message: '<p style="background-color:white;color:black;"><i class="fa fa-spin fa-spinner"></i> Cargando...</p>',
	closeButton: false
	});           
	dialog.init(function(){
	    setTimeout(function(){
	        bootbox.hideAll(); 
	    
	 		firebase.database().ref("Categorias").child(sessionStorage.getItem("categoriaNom")).orderByKey().once("value").then(function(snapshot) { 
	 		snapshot.forEach(function(childSnapshot) { 
	 		//key es el id de cada registro
			    this.key = childSnapshot.key;
	 			var ImgComer = childSnapshot.val().img_url;
	 			var nombreComer = childSnapshot.val().Nombre;
			 	var descripComer = childSnapshot.val().Descripcion;
			 	var gps = childSnapshot.val().Ubicacion;
	 		$("#comercio_item").append(
	 		'<div id="card"><img id="img-item" width="100%" heigth="80%" src="'
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
		   '<div class="container-buttons" id="bottons"><button onclick="sessionStorage.setItem(\'key\', \''+key+'\');aInfo()" class="btn-primary">Información</button><button id="iniciar" onclick="sessionStorage.setItem(\'ubicacion\', \''+gps+'\');aMap()" class="btn-secundary">Iniciar ruta</button></div></div></div><br>'		
		   );
		});
	 	}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
		});
 	}, 2500);
	});
}

//<------------- Todas las Card de la Categoria Comida -------------->
function mostrarComida(){
	sessionStorage.setItem("categoriaNom", "Comida");
	document.getElementById("nombreCat").innerHTML = sessionStorage.getItem("categoriaNom");
	// Cuadro de carga
	var dialog = bootbox.dialog({
    title: 'Por favor espera',
    message: '<p style="background-color:white;color:black;"><i class="fa fa-spin fa-spinner"></i> Cargando...</p>',
	closeButton: false
	});           
	dialog.init(function(){
	    setTimeout(function(){
	        bootbox.hideAll(); 
	    
	 		firebase.database().ref("Categorias").child(sessionStorage.getItem("categoriaNom")).orderByKey().once("value").then(function(snapshot) { 
	 		snapshot.forEach(function(childSnapshot) { 
	 		//key es el id de cada registro
			    this.key = childSnapshot.key;
	 			var ImgComida = childSnapshot.val().img_url;
	 			var nombreComida = childSnapshot.val().Nombre;
			 	var descripComida = childSnapshot.val().Descripcion;
			 	var gps = childSnapshot.val().Ubicacion;
	 		$("#comida_item").append(
	 		'<div class="card"><img width="100%" heigth="80%" src="'
	 		+ ImgComida +
	 		'"/>'
	 		);
	 		$("#comida_item").append(
	 		'<div class="container" id="comercio_nombre"><h4>'
	 		+ nombreComida
	 		);
	 		$("#comida_item").append(
	 		'</h4><p>'
	 		+ descripComida +
	 		'</p>'
			 );
	 		$("#comida_item").append(
		   '<div class="container-buttons" id="bottons"><button onclick="sessionStorage.setItem(\'key\', \''+key+'\');aInfo()" class="btn-primary">Información</button><button id="iniciar" onclick="sessionStorage.setItem(\'ubicacion\', \''+gps+'\');aMap()" class="btn-secundary">Iniciar ruta</button></div></div></div><br>'		
		   );
		});
	 	}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
		});
 	}, 2500);
	});
}

//<------------- Todas las Card de la Categoria Hospedaje -------------->
function mostrarHospedaje(){
	sessionStorage.setItem("categoriaNom", "Hospedaje");
	document.getElementById("nombreCat").innerHTML = sessionStorage.getItem("categoriaNom");
	// Cuadro de carga
	var dialog = bootbox.dialog({
    title: 'Por favor espera',
    message: '<p style="background-color:white;color:black;"><i class="fa fa-spin fa-spinner"></i> Cargando...</p>',
	closeButton: false
	});           
	dialog.init(function(){
	    setTimeout(function(){
	        bootbox.hideAll(); 
	 		firebase.database().ref("Categorias").child(sessionStorage.getItem("categoriaNom")).orderByKey().once("value").then(function(snapshot) { 
	 		snapshot.forEach(function(childSnapshot) { 
	 		//key es el id de cada registro
			    this.key = childSnapshot.key;
	 			var ImgHospe = childSnapshot.val().img_url;
	 			var nombreHospe = childSnapshot.val().Nombre;
			 	var descripHospe = childSnapshot.val().Descripcion;
			 	var gps = childSnapshot.val().Ubicacion;
	 		$("#hospedaje_item").append(
	 		'<div class="card"><img width="100%" heigth="80%" src="'
	 		+ ImgHospe +
	 		'"/>'
	 		);
	 		$("#hospedaje_item").append(
	 		'<div class="container" id="comercio_nombre"><h4>'
	 		+ nombreHospe
	 		);
	 		$("#hospedaje_item").append(
	 		'</h4><p>'
	 		+ descripHospe +
	 		'</p>'
			 );
	 		$("#hospedaje_item").append(
		   '<div class="container-buttons" id="bottons"><button onclick="sessionStorage.setItem(\'key\', \''+key+'\');aInfo()" class="btn-primary">Información</button><button id="iniciar" onclick="sessionStorage.setItem(\'ubicacion\', \''+gps+'\');aMap()" class="btn-secundary">Iniciar ruta</button></div></div></div><br>'		
		   );
		});
	 	}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
		});
 	}, 2500);
	});
}

//<------------- Todas las Card de la Categoria Salud -------------->
function mostrarSalud(){
	sessionStorage.setItem("categoriaNom", "Salud");
	document.getElementById("nombreCat").innerHTML = sessionStorage.getItem("categoriaNom");
	// Cuadro de carga
	var dialog = bootbox.dialog({
    title: 'Por favor espera',
    message: '<p style="background-color:white;color:black;"><i class="fa fa-spin fa-spinner"></i> Cargando...</p>',
	closeButton: false
	});           
	dialog.init(function(){
	    setTimeout(function(){
	        bootbox.hideAll(); 
	    
	 		firebase.database().ref("Categorias").child(sessionStorage.getItem("categoriaNom")).orderByKey().once("value").then(function(snapshot) { 
	 		snapshot.forEach(function(childSnapshot) { 
	 		//key es el id de cada registro
			    this.key = childSnapshot.key;
	 			var ImgSalud = childSnapshot.val().img_url;
	 			var nombreSalud = childSnapshot.val().Nombre;
			 	var descripSalud = childSnapshot.val().Descripcion;
			 	var gps = childSnapshot.val().Ubicacion;
	 		$("#salud_item").append(
	 		'<div class="card"><img width="100%" heigth="80%" src="'
	 		+ ImgSalud +
	 		'"/>'
	 		);
	 		$("#salud_item").append(
	 		'<div class="container" id="comercio_nombre"><h4>'
	 		+ nombreSalud
	 		);
	 		$("#salud_item").append(
	 		'</h4><p>'
	 		+ descripSalud +
	 		'</p>'
			 );
	 		$("#salud_item").append(
		   '<div class="container-buttons" id="bottons"><button onclick="sessionStorage.setItem(\'key\', \''+key+'\');aInfo()" class="btn-primary">Información</button><button id="iniciar" onclick="sessionStorage.setItem(\'ubicacion\', \''+gps+'\');aMap()" class="btn-secundary">Iniciar ruta</button></div></div></div><br>'		
		   );
		});
	 	}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
		});
 	}, 2500);
	});
}

//<------------- Todas las Card de la Categoria Turismo -------------->
function mostrarTurismo(){
	sessionStorage.setItem("categoriaNom", "Turismo");
	document.getElementById("nombreCat").innerHTML = sessionStorage.getItem("categoriaNom");
	// Cuadro de carga
	var dialog = bootbox.dialog({
    title: 'Por favor espera',
    message: '<p style="background-color:white;color:black;"><i class="fa fa-spin fa-spinner"></i> Cargando...</p>',
	closeButton: false
	});           
	dialog.init(function(){
	    setTimeout(function(){
	        bootbox.hideAll(); 
	    
	 		firebase.database().ref("Categorias").child(sessionStorage.getItem("categoriaNom")).orderByKey().once("value").then(function(snapshot) { 
	 		snapshot.forEach(function(childSnapshot) { 
	 		//key es el id de cada registro
			    this.key = childSnapshot.key;
	 			var ImgTurismo = childSnapshot.val().img_url;
	 			var nombreTuris = childSnapshot.val().Nombre;
			 	var descripTuris = childSnapshot.val().Descripcion;
			 	var gps = childSnapshot.val().Ubicacion;
	 		$("#turismo_item").append(
	 		'<div class="card"><img width="100%" heigth="80%" src="'
	 		+ ImgTurismo +
	 		'"/>'
	 		);
	 		$("#turismo_item").append(
	 		'<div class="container" id="comercio_nombre"><h4>'
	 		+ nombreTuris
	 		);
	 		$("#turismo_item").append(
	 		'</h4><p>'
	 		+ descripTuris +
	 		'</p>'
			 );
	 		$("#turismo_item").append(
		   '<div class="container-buttons" id="bottons"><button onclick="sessionStorage.setItem(\'key\', \''+key+'\');aInfo()" class="btn-primary">Información</button><button id="iniciar" onclick="sessionStorage.setItem(\'ubicacion\', \''+gps+'\');aMap()" class="btn-secundary">Iniciar ruta</button></div></div></div><br>'		
		   );
		});
	 	}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
		});
 	}, 2500);
	});
}

//                           Informacion 
// <<<<<<<<  Mostrando informacion segun categoria seleccionada >>>>>>>>>>
function mostrarInfo() {
	var ob_key = sessionStorage.getItem("key");
	console.log(ob_key);

	var dialog = bootbox.dialog({
    title: 'Por favor espera',
    message: '<p style="background-color:white;color:black;"><i class="fa fa-spin fa-spinner"></i> Cargando...</p>',
	closeButton: false
	});           
	dialog.init(function(){
	    setTimeout(function(){
	        bootbox.hideAll();
			firebase.database().ref('Categorias').child(sessionStorage.getItem("categoriaNom")).once("value").then(function(snapshot) {
				snapshot.forEach(function(childSnapshot) { 
						this.key = childSnapshot.key;
						var ImgLugar = childSnapshot.val().img_url;
						var nombreLugar = childSnapshot.val().Nombre;
						var descripLugar = childSnapshot.val().Descripcion;
						var tel  = childSnapshot.val().Telefono;
						var whats  = childSnapshot.val().Whatsapp;
						var face  = childSnapshot.val().Facebook;
						var insta  = childSnapshot.val().Instagram;
						var web = childSnapshot.val().Web;
						var gps = childSnapshot.val().Ubicacion;
						if(key == ob_key){
							$("#comercio_item").append(
								'<div class="card"><img width="100%" heigth="80%" src="'
								+ ImgLugar +
								'"/>'
								);	
								$("#comercio_item").append(
								'<div class="container" id="comercio_nombre"><h4>'
								+ nombreLugar
								);
								$("#comercio_item").append(
								'</h4><p id="text-info">'
								+ descripLugar+
								'</p>'
								);
								if(face !== ""){
									$("#comercio_item").append(
									'<ul class="container" id="referencias"><a href="'
								  	+ face +
									'"><li><img id="img-contact" src="img/facebook.png" width="15%"><label>Facebook</label></li></a></ul>'
									);
								}
								if(whats !== ""){
									$("#comercio_item").append(
									'<ul class="container" id="referencias"><a href="https://api.whatsapp.com/send?phone=503'
									+ whats +
									'"><li><img id="img-contact" src="img/whatsapp.png" width="15%"><label>Whatsapp</label></li></a></ul>'
									);
								}
								if(insta !== ""){
									$("#comercio_item").append(
									'<ul class="container" id="referencias"><a href="'
								  	+ insta +
									'"><li><img id="img-contact" src="img/instagram.png" width="15%"><label>Instagram</label></li></a></ul>'
									);
								}
								if(web !== ""){
									$("#comercio_item").append(
									'<ul class="container" id="referencias"><a href="'
								  	+ web +
									'"><li><img id="img-contact" src="img/web.png" width="15%"><label>Sitio Web</label></li></a></ul>'
									);
								}
								if(tel !== ""){
									$("#comercio_item").append(
									'<ul class="container" id="referencias"><a href="tel:'
									+ tel +
									'"><li><img id="espace1" src="img/tel.png" width="15%"><label>Teléfono</label></li></a></ul>'
									);
								}
								$("#comercio_item").append(
								'<ul class="container" id="referencias"><a href="map.html" onclick="sessionStorage.setItem(\'ubicacion\', \''+gps+'\');"><li><img id="espace" src="img/ubicacion.png" width="15%"><label>Trazar ruta</label></li></a></ul>'
								);

								// <button id="bt_list" onclick="sessionStorage.setItem(\'ubicacion\', \''+gps+'\');aMap()">Iniciar ruta</button>
						}
			});
			}, function (errorObject) {
			   console.log("The read failed: " + errorObject.code);
		   });
	}, 2500);
	});
}

function aInfo(){
	location.href="informacion.html";
}
function aMap(){
	location.href="map.html";
}