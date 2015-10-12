var crimeData = [{
    "arrest": false,
    "beat": "0513",
    "block": "003XX W 110TH ST",
    "case_number": "HY191041",
    "community_area": "49",
    "date": "2014-11-02T05:57:00.000",
    "description": "HARASSMENT BY TELEPHONE",
    "district": "005",
    "domestic": false,
    "fbi_code": "26",
    "id": "10001595",
    "iucr": "2825",
    "latitude": "41.694202189",
    "location": {
        "type": "Point",
        "coordinates": [-87.631029,
            41.694202
        ]
    },
    "location_description": "RESIDENCE",
    "longitude": "-87.631029227",
    "primary_type": "OTHER OFFENSE",
    "updated_on": "2015-03-22T16:07:18.000",
    "ward": "34",
    "x_coordinate": "1176057",
    "y_coordinate": "1831941",
    "year": "2014"
}
];
var serviceData = [
{
    "service_request_id": "14-00684314",
    "status": "closed",
    "status_notes": "CDOT Inspect Public Way Survey Transfer Outcome",
    "service_name": "Pothole in Street",
    "service_code": "4fd3b656e750846c53000004",
    "agency_responsible": "Division of In-House Construction CDOT",
    "requested_datetime": "2014-05-09T19:02:21-05:00",
    "updated_datetime": "2015-10-10T10:15:40-05:00",
    "address": "1200 W 81ST ST, CHICAGO, IL, 60620",
    "lat": 41.74685764200721,
    "long": -87.6536401592609
  }
];

var map, heatmap;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {
            lat: 41.8914,
            lng: -87.666
        },
        mapTypeId: google.maps.MapTypeId.MAP
    });

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map
    });
}

function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
    var gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
    ];
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
    heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
    heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

// my stuff
var coordinates = [];

// console.log(crimeData.length);
// crime data point collection
for (var i = 0; i < crimeData.length; i++) {
    if ((crimeData[i].hasOwnProperty('latitude')) && (crimeData[i].hasOwnProperty('longitude'))) {
        coordinates.push([crimeData[i].latitude, crimeData[i].longitude]);
    }
}

//service datapoint collection
for (var i = 0; i < serviceData.length; i++){
  if ((serviceData[i].hasOwnProperty('lat')) && (serviceData[i].hasOwnProperty('long'))) {
      serviceData[i]['longitude'] = serviceData[i]['long'];
      delete serviceData[i]['long'];
      serviceData[i]['latitude'] = serviceData[i]['lat'];
      delete  serviceData[i]['lat'];
      coordinates.push([serviceData[i].latitude, serviceData[i].longitude]);
  }
}

function getPoints() {
    var points = [];
    for (var i = 0; i < coordinates.length; i++) {
        points.push(new google.maps.LatLng(coordinates[i][0], coordinates[i][1]));
    }
    return points;

}