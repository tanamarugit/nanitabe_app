document.addEventListener('DOMContentLoaded', function() {
  
  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');
  const shopList = document.querySelector('#shop-list');

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    status.textContent = '';
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    
    const apiKey = window.apiKey;
    const url = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${apiKey}&lng=${longitude}&lat=${latitude}&range=1&format=json&count=10`;
    

    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data); // レスポンスの内容をコンソールに表示
        if (data.results && data.results.shop && Array.isArray(data.results.shop)) {
          const shops = data.results.shop;
          let shopHTML = '';
          shops.forEach(shop => {
            const shopName = shop.name;
            shopHTML += `<li>${shopName}</li>`;
          });
          shopList.innerHTML = shopHTML;
        } else {
          console.error('Invalid data format:', data);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  

    var mapOptions = {
      center: { lat: latitude, lng: longitude },
      zoom: 16
    };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var marker = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: map,
      title: '現在地'
    });
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
});
