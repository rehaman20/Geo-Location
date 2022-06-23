'use strict';
const getLocationButton = document.querySelector('.location-button');
getLocationButton.addEventListener('click', function () {
  if (navigator.geolocation) {
    getLocationButton.textContent = `Allow to detect location`;
    navigator.geolocation.getCurrentPosition(onSuccess, onFailure);
  } else {
    getLocationButton.textContent = "Your browser doesn't support geolocation";
  }
});

const onSuccess = function (position) {
  getLocationButton.textContent = `Detecting your Location...`;
  const { latitude, longitude } = position.coords;
  // https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR-API-KEY
  fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=0a88aefad014400484cc94edf536f6b1`
  )
    .then(response => response.json())
    .then(data => {
      let allDetails = data.results[0].components;
      const { county, postcode, country } = allDetails;
      getLocationButton.textContent = `${county} ${postcode}, ${country}`;
    })
    .catch(() => {
      getLocationButton.textContent = `Something Went Wrong`;
    });
};

const onFailure = function (error) {
  if (error.code === 1) {
    // If User denied the request
    getLocationButton.textContent = `You denied the request`;
  } else if (error.code === 2) {
    //If location is not available
    getLocationButton.textContent = `Location not available`;
  } else {
    // If any other error occurs
    getLocationButton.textContent = `Something went wrong! Try again later.`;
  }
  getLocationButton.setAttribute('disabled', 'true');
  getLocationButton.style.pointerEvents = 'none';
};
