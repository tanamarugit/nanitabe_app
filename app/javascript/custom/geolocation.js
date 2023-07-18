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
    const url = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${apiKey}&lng=${longitude}&lat=${latitude}&range=5&format=json&count=10`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data); // レスポンスの内容をコンソールに表示
        if (data.results && data.results.shop && Array.isArray(data.results.shop)) {
          const shops = data.results.shop;
          let shopHTML = '';
          shops.forEach(shop => {
            const shopName = shop.name;
            const shopAddress = shop.address;
            const shopLogoimage = shop.logo_image;
            const shopUrl = shop.urls.pc;
            shopHTML += `<li><a href="${shopUrl}">${shopName}</a></li>`;
            shopHTML += `<li>${shopAddress}</li>`;
            shopHTML += `<li><image src =${shopLogoimage} ></li>`;
          });
          shopList.innerHTML = shopHTML;
        } else {
          console.error('Invalid data format:', data);
          status.shopList = '近くに飲食店が見つかりませんでした。';
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
    let map;

    async function initMap() {
      //@ts-ignore
      const { Map } = await google.maps.importLibrary("maps");
    
      map = new Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    }
    
    initMap();
});