
const auth = firebase.auth();
var database = firebase.database();
var estadoUser = false;

//registra un nuevo usuario
function registrarUsuario(){

	var correo = document.getElementById('correo').value;
	var contra = document.getElementById('contra').value;

	firebase.auth().createUserWithEmailAndPassword(correo, contra)

	.then(function(){

		var correoUser = correo;

	 	firebase.database().ref("Usuarios").push({
	        Nombre: document.getElementById('nombre').value,
	        Apellido: document.getElementById('apellido').value,
	        Correo: correoUser
	  	});

		alert(correo + " se ha registrado con exito");
		verificar();
	})
	.catch(function(error) {
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  alert("El correo o contraseña son invalidos. (La contraseña debe tener minimo 6 caracteres)");
	});
}

//inicio de sesion del usuario
function ingresar(){

	var correo = document.getElementById("correo2");
	var contra = document.getElementById("contra2");

	const promise = auth.signInWithEmailAndPassword(correo.value, contra.value)
	
	.then(function(){
		estadoUser = true;
		alert("Ingreso sesión con exito " + correo.value);
		apaginaprincipal();
	})
	.catch(function(error){
		console.log("Error al iniciar sesion");
		alert("El usuario o contraseña no son validos");
	})

	//promise.catch(e => alert(e.message))

}	


//verifica si hay un usuario activo
function observador(){
            
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('existe usuario activo');
        console.log(user.emailVerified);
        console.log(user.email);
        //muestra el correo del usuario en la etiqueta <li>
        document.getElementById("userActivo").innerHTML = user.email;
        //hace visible el <li> cuando hay un usuario activo
        userActivo.style.display = "block";
        estadoUser = true;
       
        // el usuario ha iniciado sesion
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        var usu_correo = user.email;
        // ...
      } else {
        // el usuario no ha iniciado sesion
        console.log('no existe usuario activo');
        estadoUser = false;
        // ...
      }
    });
}
observador();

//envia correo de verificación
function verificar(){
	var user = firebase.auth().currentUser;

	user.sendEmailVerification().then(function() {
	  // Email sent.
	  alert("Te hemos enviado un correo de verificación");
	  apaginaprincipal();
	}).catch(function(error) {
	  // An error happened.
	  alert("No se pudo enviar el correo de verificación");
	});
}


//cierra sesion del usuario
function cerrar(){
	firebase.auth().signOut();
	estadoUser = false;
	apaginaprincipal();
}

function verifBotoncerrar(){
	
	if (estadoUser == true) {
	    //hace visible el boton cerrar sesion
		btn_cerrar.style.display = "inline";
	}else{
		btn_cerrar.style.display = "none";
	}

}

function apaginaprincipal(){
  location.href="principal.html";
} 

function alogin(){
	location.href="login.html";
}