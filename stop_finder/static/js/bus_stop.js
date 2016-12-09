'use strict';

// need to plot points on google maps
var map;
var marker;
 function initMap() {
       
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 45.523, lng: -122.676},
      scrollwheel: false,
      zoom: 10
        
    });
};


function get_stops(stops){
    
    for (var i = 0; i < stops.length; i++){
        var stop_list = [];
        // table data
        var stop = stops[i];
        var stop_id = stop.locid;
        var street = stop.desc;
        var direction = stop.dir;
        var routes = stop.route;
        // marker data
        var lat = stop.lat;
        var lng = stop.lng;
        var stop_loc = {lat: lat, lng: lng};
        
        var marker = new google.maps.Marker({
          position: stop_loc,
          map: map,
          animation: google.maps.Animation.DROP,
          title: "Stop ID: "+String(stop_id)+','+' '+street+','+' '+direction
        });
        
        marker.setMap(map)
        console.log(stop_loc)
        stop_list.push(stop_id, street, direction, routes)
            
            // route links
            for (var r = 0; r < stop.route.length; r++){
                var each_route = stop.route[r];
                var route_number = String(each_route.route);

                  if (route_number.length == 1) {
                      var route_link = String(route_number).link("http://trimet.org/schedules/r00"+route_number+".htm");

                  } else if (route_number.length == 2){
                      var route_link = String(route_number).link("http://trimet.org/schedules/r0"+route_number+".htm");

                  } else {
                        var route_link = String(route_number).link("http://trimet.org/schedules/r"+route_number+".htm");
                  }

                stop_list.push(route_link);

            };
        // appends table
        stop_list = stop_list.filter( function( item, index, inputArray ) {
        return inputArray.indexOf(item) == index;// gets rid of duplicates in the list
        });

        console.log(stop_list)
        var $stop_info = $('<tr><td>'+stop_list[0]+'</td><td>'+stop_list[1]+'</td><td>'+stop_list[2]+'</td><td>'+stop_list.slice(4)+'</tr>'); // since no end in the slice.  it will take from the 3rd index to the end of the array

        $('tbody').append($stop_info)
    };
    
};

// gets the stop info      
$('#get_stops').on('click', function(evt){
    
    $('tbody').empty();
    
    var pdx_points = ['45.523062,-122.676482', '45.520533,-122.658534', '45.568206,-122.699261', '45.536872,-122.869377', '45.526259,-122.779856', '45.519064,-122.399025']
    
    var latlong = pdx_points[Math.floor(Math.random()*pdx_points.length)];
    
    $.ajax({url: "https://developer.trimet.org/ws/V1/stops",

    type: 'GET',

    data: {json: 'true', ll: latlong, meters: 400, showRoutes: 'true', appID: appID },

    success: function(response){
        console.log(response);
        get_stops(response.resultSet.location);
    },

    error: function(error){
         alert(error);
    },

    });

}); 

$('#refresh').on('click', function(evt){
    
    location.reload();
    
});

    
    