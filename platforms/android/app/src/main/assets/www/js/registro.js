var firebaseConfig = {
            apiKey: "AIzaSyBYrSbia708S0SsWQVhPF2SZKoisHCnI3o",
            authDomain: "descubresanmiguel.firebaseapp.com",
            databaseURL: "https://descubresanmiguel.firebaseio.com",
            projectId: "descubresanmiguel",
            storageBucket: "descubresanmiguel.appspot.com",
            messagingSenderId: "394849091551",
            appId: "1:394849091551:web:8b314179b6b19db7dece6a"
          };
          
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
//var database = firebase.database();

//registra un nuevo usuario
function registrarUsuario(){

	var correo = document.getElementById('correo').value;
	var contra = document.getElementById('contra').value;

	firebase.auth().createUserWithEmailAndPassword(correo, contra)

	.then(function(){
		alert(correo + " se ha registrado con exito");
		alogin();
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
	    // el usuario ha iniciado sesion
	    var displayName = user.displayName;
	    var email = user.email;
	    var emailVerified = user.emailVerified;
	    var photoURL = user.photoURL;
	    var isAnonymous = user.isAnonymous;
	    var uid = user.uid;
	    var providerData = user.providerData;
	    // ...
	  } else {
	    // el usuario no ha iniciado sesion
	    console.log('no existe usuario activo');
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
	}).catch(function(error) {
	  // An error happened.
	  alert("No se pudo enviar el correo de verificación");
	});
}

//cierra sesion del usuario
function cerrar(){
	firebase.auth().signOut();
	apaginaprincipal();
}

function apaginaprincipal(){
  location.href="principal.html";
} 

function alogin(){
	location.href="login.html";
}