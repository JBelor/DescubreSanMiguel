
 /* Parte del spash*/
(function(){
    var preload = document.getElementById("preload");
    var loading = 0;
    var id = setInterval(frame , 64)

    function frame(){
        if(loading == 100){
            clearInterval(id);
            window.location.href="principal.html";
        }else{
            loading = loading + 1;
            if(loading == 90){
                preload.style.animation = "fadeout 1s ease"
            }
        }
    }
})();


/*Parte de la app del cordova original*/
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();