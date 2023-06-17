function initMap(){
  geocoder = new google.maps.Geocoder()

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7828, lng:-73.9653},
    zoom: 12,
  });

  marker = new google.maps.Marker({
    position:  {lat: 40.7828, lng:-73.9653},
    map: map
  });
}

document.addEventListener('DOMContentLoaded', function() {
  geoFindMe()
});
function geoFindMe() {

  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

    // Googleマップを表示するための設定を行います
    var mapOptions = {
      center: { lat: latitude, lng: longitude },
      zoom: 16
    };

    // Googleマップを作成します
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // ピンを立てるためのマーカーを作成します
    var marker = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: map,
      title: "現在地"
    });

    var xhr = new XMLHttpRequest();
    var url = "/maps?latitude=" + latitude + "&longitude=" + longitude;
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        // 必要な処理を実行する
        var shopNames = response.results.shop.map(function(shop) {
          return shop.name;
        });
        console.log(shopNames);
      }
    };
    xhr.send();

  }
  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
}