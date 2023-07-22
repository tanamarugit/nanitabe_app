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
    // const url = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${apiKey}&lng=145.552090&lat=35.286197&range=5&format=json&count=10`;


    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.shop && Array.isArray(data.results.shop)) {
          const shops = data.results.shop;
          if (parseInt(data.results.results_available) === 0) {
            let shopHTML = '近くに飲食店が見つかりませんでした';
            shopList.innerHTML = shopHTML;
          } else {
            let shopHTML = '';
            shops.forEach(shop => {
              const shopName = shop.name;
              const shopAddress = shop.address;
              const shopLogoimage = shop.logo_image;
              const shopUrl = shop.urls.pc;
              const shopGenre = shop.genre.name
              shopHTML += `<li>ジャンル${shopGenre}</li>`;
              shopHTML += `<li><a href="${shopUrl}">${shopName}</a></li>`;
              shopHTML += `<li>アクセス${shopAddress}</li>`;
              shopHTML += `<li><image src =${shopLogoimage} ></li>`;
            });
            shopList.innerHTML = shopHTML; 
          }
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
    if (!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
    function error() {
      status.textContent = 'Unable to retrieve your location';
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