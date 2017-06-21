function initMap(){
	var map = new google.maps.Map(document.getElementById("map"),{
		zoom: 5,
		center: {lat: -9.1191427, lng: -77.0349046},
		mapTypeControl:false,
		zoomControl: false,
		streetViewControl: false
	});

	function buscar(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
		}
	}

	document.getElementById("encuentrame").addEventListener("click", buscar);

	var latitud, longitud;

	var funcionExito = function(posicion){
		latitud = posicion.coords.latitude;
		longitud = posicion.coords.longitude;

		var miUbicacion = new google.maps.Marker({
			position: {lat:latitud, lng: longitud},
			animation: google.maps.Animation.DROP,
			map:map
		});

		map.setZoom(17);
		map.setCenter({lat:latitud, lng:longitud});
	}

	var funcionError = function(error){
		alert("Tenemos un problema con encontrar tu ubicación");
	}

	var input =(document.getElementById('origen'));
	var inputDos = (document.getElementById('destino'));


	var autocomplete = new google.maps.places.Autocomplete(input);
	autocomplete.bindTo('bounds', map);

	var autocompleteDos = new google.maps.places.Autocomplete(inputDos);
	autocompleteDos.bindTo('bounds', map);

	
	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;

	document.getElementById('origen').addEventListener('change', onChangeHandler);
	document.getElementById('destino').addEventListener('change', onChangeHandler);

	directionsDisplay.setMap(map);
		
	
	function calculateAndDisplayRoute(directionsService, directionsDisplay) {
		directionsService.route({
			origin: document.getElementById('origen').value,
			destination: document.getElementById('destino').value,
			travelMode: 'DRIVING'
		}, 
		function(response, status) {
			if (status === 'OK') {
				directionsDisplay.setDirections(response);
			} 
		});
	}

	var onChangeHandler = function() {
		calculateAndDisplayRoute(directionsService, directionsDisplay);
	};
	var ruta = document.getElementById("ruta").addEventListener("click", onChangeHandler);

}