/*global $*/
/*global google*/
var place = {lat: 20.540024, lng: 2.827833};
var imgPlace = {};
var countMapClicks = 0;
var markers = [];
var flightPlanCoordinates;
var flightPath;
var map;

// initial image API call
getImage();

// Update image button listener
$("#btn").click(function(){
    countMapClicks = 0;
    getImage();
    removeMarkers();
    flightPath.setMap(null);
    $('#location').addClass('d-none');
  });

// GOOGLE MAPS API LOGIC
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: place,
        zoom: 2
    });
    
    // Map listener
    map.addListener('click', function(e){
        if(countMapClicks === 0){
            countMapClicks = 1;
            placeMarkerAndPanTo(e, map);
        }
    });
}

// HELPER FUNCTIONS
function placeMarkerAndPanTo(e, map) {
    place = e.latLng;
    let markerA = new google.maps.Marker({position: place, map: map, icon: '/imgs/yellow_MarkerA.png'});
    let markerB = new google.maps.Marker({position: imgPlace, map: map, icon: '/imgs/purple_MarkerB.png'});
    markers.push(markerA);
    markers.push(markerB);
    flightPlanCoordinates = [place, imgPlace];
    flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    flightPath.setMap(map);
    // centers the map around marker
    map.panTo(e.latLng);
    $('#location').removeClass('d-none');
}


// Unsplash API get request

// ***This is an alternative get image handler that I'm currently working on but having some issues due to access permissions. Knopka
// function getImage(){
//     $.getJSON("https://api.unsplash.com/users/knopka/photos/?client_id=4bd9f32c51311d71e2d0349f4a2ee6131bbdff130110b17b702daad44e42f39e")
//     .done(function(data){
//         let randomIndex = Math.floor(Math.random() * data.length); // randomize photo calculation
//         updateImage(data[randomIndex]);
//     })
//     .fail(function(jqxhr, textStatus, error){
//         var err = `${textStatus}, ${error}`;
//         console.log(`Request Failed: ${err}`);
//     });
// }

function getImage(){
    $.getJSON("https://api.unsplash.com/photos/random/?client_id=4bd9f32c51311d71e2d0349f4a2ee6131bbdff130110b17b702daad44e42f39e")
    .done(function(data){
        updateImage(data);
    })
    .fail(function(jqxhr, textStatus, error){
        var err = `${textStatus}, ${error}`;
        console.log(`Request Failed: ${err}`);
    });
}

// Update image with data received from Unsplash

// ***This is an alternative get image handler that I'm currently working on but having some issues due to access permissions. Knopka
// function updateImage(data){
//     $('.imgLink').attr('href', data.links.html);
//     $('#img').attr("src", data.urls.regular);
//     $('#author').text(data.user.name);
//     $('#location').text(data.location.name);
//     console.log(`Location name is: ${data.location.name}`);
//     console.log(`Location latitude is: ${data.location.position.latitude}`);
//     console.log(`Location longitude is: ${data.location.position.longitude}`);
//     imgPlace.lat = Number(data.location.position.latitude);
//     imgPlace.lng = Number(data.location.position.longitude);
// }

function updateImage(data){
    $('.imgLink').attr('href', data.links.html);
    $('#img').attr("src", data.urls.regular);
    $('#author').text(data.user.name);
    $('#location').text(data.location.name);
    imgPlace.lat = Number(data.location.position.latitude);
    imgPlace.lng = Number(data.location.position.longitude);
}

// removes all markers on the map
function removeMarkers(){
    for(i=0; i<markers.length; i++){
        console.log(`Removing ${markers[i]}`)
        markers[i].setMap(null);
    }
}