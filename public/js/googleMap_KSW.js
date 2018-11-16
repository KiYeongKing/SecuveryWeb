/**
 * Created by SW on 2018-09-10.
 */
var map;
function myMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 36.6393449, lng: 127.4746804},
        zoom: 13
    });
}