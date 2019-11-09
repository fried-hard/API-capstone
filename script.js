let submitButton = document.querySelector(".submitButton");
let clearButton = document.querySelector(".clearButton");
let inputValue = document.querySelector(".inputValue");
let numberList = document.querySelector(".numberList");
let listContainer = document.querySelector(".display");
let enableEnterKey = inputValue.addEventListener("keyup", submitFormEnter);
let onClick = submitButton.addEventListener("click", getVenueList);
let requiredValue = inputValue.addEventListener("keyup", inputReq);

//Initialize Google map.
var map;
document.getElementById("map").style.display = "none";

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: new google.maps.LatLng(37.09024, -95.712891),
    mapTypeId: "terrain",
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }]
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }]
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }]
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }]
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }]
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }]
      }
    ]
  });
}

function inputReq(requiredValue) {
  if (inputValue.value !== "") {
    submitButton.disabled = false;
  } else submitButton.disabled = true;
}


function submitFormEnter(enableEnterKey) {
  event.preventDefault();
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("map").style.display = "flex";
  }
}

function getVenueList(onClick) {
  event.preventDefault();
  submitButton.disabled = false;
  numberList.innerHTML = "";
  document.getElementById("map").style.display = "flex";

  fetch(
    `https://api.foursquare.com/v2/venues/explore?client_id=CD0UGW5VRHOLK2JGTB0DLKOUKJNUPT4EPWVU1HNBZZ0MQCF2&client_secret=ZSOS1UZWPVIQVWRGIFK32GZW4YO2Y1OYRFXNUEIPWKP4QF33&v=20191012&near=${inputValue.value}&section=toppicks`
  )
    .then(response => response.json())
    .then(data => {
      //narrows down to the items needed in the json reponse data.
      let venues = data.response.groups[0].items;

      function thisList(venues) {
        //listContainer.appendChild(numberList)
        for (let i = 0; i < venues.length; i++) {
          let venueList = venues[i].venue.name;
          // let orderedList = venueList.keys(venues);
          let locationLat = venues[i].venue.location.lat;
          let locationLng = venues[i].venue.location.lng;
          let venueLocation = venues[i].venue.location.address;
          let completeList = venueList.concat(" / " + venueLocation);
          listItem = document.createElement("li");
          listItem.innerHTML = completeList;
          numberList.appendChild(listItem);

          let orderNum = i + 1;
          let orderNumtoString = orderNum.toString();
          console.log(orderNumtoString);

          //initializes the markers on the map and zooms in on the results.
          let marker = new google.maps.Marker({
            position: new google.maps.LatLng(locationLat, locationLng),
            map: map,
            title: venueList,
            label: orderNumtoString
          });
          map.setZoom(13);
          map.panTo(marker.position);
        }
      }
      //displays the results.
      thisList(venues);
    })

    .catch(err => alert("Cannot Find"));

  clearButton.addEventListener("click", clearPage);
  function clearPage() {
    numberList.innerHTML = "";
    inputValue.value = "";
    submitButton.disabled = false;
    document.getElementById("map").style.display = "none";
    initMap();
  }
}
inputReq(requiredValue);
