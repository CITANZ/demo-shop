/*
routing_options = {
    enabled,
    input_id,
    output_id
}
*/
window.usedGAPI = window.usedGAPI ? window.usedGAPI : [];
var gmap = function(api_key, map_id, locs, zoom_rate, routing_options, disableUI, disableScroll)
{
    var self            =   this,
        map             =   null,
        center_point    =   null,
        dir_service     =   null,
        dir_display     =   null,
        markers         =   [];

    this.init = function()
    {
        if (locs && locs.length > 0) {
            if (locs.length > 1) {
                var bound = new google.maps.LatLngBounds();

                for (i = 0; i < locs.length; i++) {
                    bound.extend( new google.maps.LatLng(locs[i].lat, locs[i].lng) );
                }

                center_point = bound.getCenter();

            } else {
                center_point = locs[0];
            }

            map = new google.maps.Map(document.getElementById(map_id), {
              zoom: zoom_rate ? zoom_rate : 18,
              center: center_point,
              styles: [
                    {
                        "featureType"   :   "water",
                        "elementType"   :   "geometry",
                        "stylers"       :   [
                                                { "visibility": "on" },
                                                { "color": "#6ea5aa" }
                                            ]
                    },
                    {
                        "featureType"   :   "landscape.natural",
                        "stylers"       :   [
                                                { "color": "#f0e6c8" }
                                            ]
                    },
                    {
                        "featureType"   :   "poi.park",
                        "stylers"       :   [
                                                { "color": "#c4d82d" },
                                                {'visibility': 'simplified'}
                                            ]
                    }
                ],
              disableDefaultUI: (disableUI === undefined || disableUI === null) ? false : disableUI
            });

            if (disableUI) {
                var noPoi = [
                    {
                        featureType: "poi",
                        stylers: [
                          { visibility: "off" }
                        ]
                    }
                ];

                map.setOptions({styles: noPoi});
            }

            if (disableUI) {
                map.setOptions({scrollwheel: false});
            }

            for (var i = 0; i < locs.length; i++) {
                var marker      =   new google.maps.Marker(
                                    {
                                        position    :   locs[i],
                                        map         :   map,
                                        icon        :   global.base_url + '/themes/default/images/stockist_marker.png'
                                    }),
                    infowindow  =   new google.maps.InfoWindow(
                                    {
                                        content     :   '<a target="_blank" href="https://www.google.com/maps/place/data=!4m2!3m1!1s0x6d69b7b04a05a2ad:0xc1555f77cd924c9b?hl=en-AU" class="button is-info">View on Google map</a>'
                                    });

                markers.push(marker);
                marker.addListener('click', function()
                {
                    // infowindow.open(map, marker);
                    var win = window.open('https://www.google.com/maps/place/data=!4m2!3m1!1s0x6d69b7b04a05a2ad:0xc1555f77cd924c9b?hl=en-AU', '_blank');
                    win.focus();
                });
            }

            if (routing_options && routing_options.enabled) {
                dir_service = new google.maps.DirectionsService();
                dir_display = new google.maps.DirectionsRenderer();
                dir_display.setMap(map);
                if (routing_options.output_id) {
                    dir_display.setPanel(document.getElementById(routing_options.output_id));
                }

                var autoComplete = new google.maps.places.Autocomplete(
                    /** @type {!HTMLInputElement} */(document.getElementById(routing_options.input_id)),
                    {types: ['geocode']});
                autoComplete.addListener('place_changed', function()
                {
                    var place = autoComplete.getPlace();
                    $('#' + routing_options.input_id).data('lat', place.geometry.location.lat());
                    $('#' + routing_options.input_id).data('lng', place.geometry.location.lng());
                });
            }
        }
    };

    this.update = function(lat, lng)
    {
        self.clearMarkers();
        lat = typeof(lat) == 'string' ? lat.toFloat() : lat;
        lng = typeof(lng) == 'string' ? lng.toFloat() : lng;
        var marker = new google.maps.Marker({
            position: {lat: lat, lng: lng},
            map: map
        });

        markers.push(marker);
        map.setCenter({lat: lat, lng: lng});
    };

    this.clearMarkers = function()
    {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }

        markers = [];
    };

    this.route = function(origin, destination, travel_mode)
    {
        var request = {
            origin:         origin,
            destination:    destination,
            travelMode:     travel_mode ? travel_mode : 'DRIVING'
        };

        dir_service.route(request, function(response, status) {
            if (status == 'OK') {
                dir_display.setDirections(response);
            }
        });
    };

    if (!window.google) {
        if (!window.usedGAPI[api_key]) {
            window.usedGAPI[api_key] = true;
            $.when(
                $.getScript( "https://maps.googleapis.com/maps/api/js?key=" + api_key + "&libraries=places"),
                $.Deferred(function( deferred ){
                    $( deferred.resolve );
                })
            ).done(self.init);
        } else {
            var watching = setInterval(function(){
                if (window.google) {
                    clearInterval(watching);
                    watching = null;
                    self.init();
                }
            }, 50);
        }
    } else {
        self.init();
    }
    return this;
};

(function($)
{
    $.fn.gmap = function(cbf)
    {
        var self        =   $(this),
            url         =   self.data('url'),
            callback    =   cbf,
            lat         =   self.data('lat').toFloat(),
            lng         =   self.data('lng').toFloat(),
            zoom        =   Math.round(self.data('zoom').toFloat()),
            api         =   self.data('api'),
            input       =   self.data('input'),
            output      =   self.data('output'),
            map         =   new gmap(api, self.attr('id'), [{lat: lat, lng: lng, url: url, cbf: callback}], zoom, {enabled: (input !== undefined ? true : false), input_id: input, output_id: output});

        return map;
    };
 })(jQuery);
