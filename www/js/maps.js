function mapa(){
    var divmap = document.getElementById("map");
    window.navigator.geolocation.getCurrentPosition(fn_ok);

  function fn_ok(rta){
         var lat = rta.coords.latitude;
         var lon = rta.coords.longitude;

         var glanLon =new google.maps.LatLng(lat , lon);
         objConfig = {
            zoom: 17,
            center: glanLon
         }
         var gmapa = new google.maps.Map(divmap , objConfig) ;

        /* var marker = new google.maps.Marker({
            position: glanLon,
            map: gmapa,
            title: "Esta es tu posicion"
         
        });*/
 
         console.log(lat);
         console.log(lon);

    var objconfigDR = {
      map: gmapa,
    }
    var objconfigDS = {
        origin: glanLon,
        destination:'Pizza Hut, Metrocentro San Miguel, San Miguel',
        travelMode:google.maps.TravelMode.DRIVING
    }
    

    var ds = new google.maps.DirectionsService(objconfigDS);
    var dr = new google.maps.DirectionsRenderer(objconfigDR)

    ds.route(objconfigDS , fnRutear);

    function fnRutear(resultado , status){
    if(status == "OK"){
        dr.setDirections(resultado);
    }else{
        alert("Error! No se pudo trazar la ruta");
    }
    }
  }
}

/*
 coord = 13.4653317 , -88.1691289
   
*/






