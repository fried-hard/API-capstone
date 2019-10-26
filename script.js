var submitButton = document.querySelector('.submitButton')
var clearButton = document.querySelector('.clearButton')
var inputValue = document.querySelector('.inputValue')
var list = document.createElement('ul');
var listContainer = document.querySelector('.display');
var placeHolder = document.getElementsByClassName('inputValue')

//initialize google map.
var map;
function initMap() {

    map = new google.maps.Map(document.getElementById('map'),{
        zoom: 3,
        center: new google.maps.LatLng(37.09024, -95.712891),
        mapTypeId: 'terrain'
    });
}


//event listener for submit button.
submitButton.addEventListener('click', function(){

//Empties previous results. 
  submitButton.disabled = false;
  list.innerHTML = "";
  initMap();



//GET api.   
fetch('https://api.foursquare.com/v2/venues/explore?client_id=CD0UGW5VRHOLK2JGTB0DLKOUKJNUPT4EPWVU1HNBZZ0MQCF2&client_secret=ZSOS1UZWPVIQVWRGIFK32GZW4YO2Y1OYRFXNUEIPWKP4QF33&v=20191012&near='+inputValue.value+'&section=toppicks')
.then(response => response.json())
.then(data => {

   //narrows down to the items needed in the json reponse data.
    var venues = data.response.groups[0].items;

//function that loops through to display results.
  

        function thisList(venues) {
          listContainer.appendChild(list)
            for (let i = 0; i < venues.length; i++){
            let venueList = venues[i].venue.name;
                let locationLat = venues[i].venue.location.lat;
                    let locationLng = venues[i].venue.location.lng;
                        let venueLocation = venues[i].venue.location.address;
                            let completeList = venueList.concat(" | Location: " + venueLocation);
                            listItem = document.createElement('li');
                            listItem.innerHTML = completeList;
                            list.appendChild(listItem);
                             console.log(venues);


            //initializes the markers on the map and zooms in on the results.    
            let marker = new google.maps.Marker({
            position: new google.maps.LatLng(locationLat,locationLng), 
            map:map,
            title: venueList
            });
            map.setZoom(11);
            map.panTo(marker.position);

            
            

                
             }

                                      
 }
//displays the results. 
thisList(venues);   
        
})

.catch(err => alert("Cannot find"))



 
//removes any previous results and reenables the submission form. 
clearButton.addEventListener('click', function(){ 
list.innerHTML = "";
inputValue.value = "";
submitButton.disabled = false;
initMap();





    })


})       



                                                 
                                                                                                
      

     














