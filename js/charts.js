var crimeData = [];
var serviceData = [];

// ajax call to crime dataset
$.ajax({
    url: "https://data.cityofchicago.org/resource/6zsd-86xi.json?year=2014",
    dataType: 'json',
    async: false,
    success: function(results)
    {
      $.each(results, function(index, value){
        crimeData.push(value);
      });
    }
});

// ajax call to 311 dataset

// $.ajax({
//     url: "http://311api.cityofchicago.org/open311/v2/requests.json?start_date=2014-01-01T00:00:00Z&end_date=2014-12-31T00:00:00Z&extensions=extensions=true",
//     dataType: 'json',
//     async: false,
//     success: function(results)
//     {
//       $.each(results, function(index, value){
//         serviceData.push(value);
//       });
//     }
// });

// caching length of datasets
var crimeDataLength = crimeData.length;
var serviceDataLength = serviceData.length;


// HEAT MAP
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

// crime data point collection
for (var i = 0; i < crimeData.length; i++) {
    if ((crimeData[i].hasOwnProperty('latitude')) && (crimeData[i].hasOwnProperty('longitude'))) {
        coordinates.push([crimeData[i].latitude, crimeData[i].longitude]);
    }
}

//service datapoint collection
for (var i = 0; i < serviceDataLength; i++) {
    if ((serviceData[i].hasOwnProperty('lat')) && (serviceData[i].hasOwnProperty('long'))) {
        serviceData[i]['longitude'] = serviceData[i]['long'];
        delete serviceData[i]['long'];
        serviceData[i]['latitude'] = serviceData[i]['lat'];
        delete serviceData[i]['lat'];
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

// Crime Type Bar Chart

var crimeByType = {};

for (var i = 0; i < crimeDataLength; i ++ ){
  var num = crimeData[i].primary_type;
  crimeByType[num] = crimeByType[num] ? crimeByType[num] + 1 : 1;
}

var crimeCounts = [];
// sorts the crime counts descending
for (var crime in crimeByType){
  crimeCounts.push([crime, crimeByType[crime]]);
  crimeCounts.sort(function(a,b) {return b[1] - a[1]});
};

var crimeTypeData = [
  {
    x: [crimeCounts[0][0], crimeCounts[1][0], crimeCounts[2][0], crimeCounts[3][0], crimeCounts[4][0], crimeCounts[5][0]],
    y: [crimeCounts[0][1], crimeCounts[1][1], crimeCounts[2][1], crimeCounts[3][1], crimeCounts[4][1], crimeCounts[5][1]],
    type: 'bar'
  }
];

Plotly.newPlot('crime_type_bar_chart', crimeTypeData);

// Crime/Service Request by ward

//crime by ward data
var crimeByWard = {};

var crimes = [];

for (var i = 0; i < crimeDataLength; i ++ ){
  var num = crimeData[i].ward;
  crimeByWard[num] = crimeByWard[num] ? crimeByWard[num] + 1 : 1;
}

for (var o in crimeByWard){
    crimes.push(crimeByWard[o]);
};

//service by ward data

var serviceByWard = {};
var serviceCounts = [];

for (var i = 0; i < serviceDataLength; i ++ ){
  var num = serviceData[i]['extended_attributes']['ward'];
  serviceByWard[num] = serviceByWard[num] ? serviceByWard[num] + 1 : 1;
}

for (var o in serviceByWard){
    serviceCounts.push(serviceByWard[o]);
}

var crimeTrace = {
  x: Object.keys(crimeByWard),
  y: crimes,
  name: 'Crime',
  type: 'bar'
};

var serviceTrace = {
  x: Object.keys(serviceByWard),
  y: serviceCounts,
  name: '311 Requests',
  type: 'bar'
};

var groupedBarData = [crimeTrace, serviceTrace];

var groupedBarLayout = {barmode: 'group'};

Plotly.newPlot('crime_311_by_ward', groupedBarData, groupedBarLayout);

// bubble chart

var wardData = {};
var avgResponse = [];
var msDay = 60*60*24*1000;

serviceData.forEach(
  function(e) {
    if (!wardData[e.extended_attributes.ward]) {
      wardData[e.extended_attributes.ward] = 0;
    }
    var openDate = new Date(e.requested_datetime);
    var closeDate = new Date(e.updated_datetime);

    wardData[e.extended_attributes.ward] += Math.floor((closeDate - openDate) / msDay);
    serviceByWard[e.extended_attributes.ward] ++;
  }
)

for (var ward in wardData) {
  avgResponse.push({ward : ward, responseTime : wardData[ward] / serviceByWard[ward]})
}

var responses = [];
for (var o in wardData) {
  responses.push(wardData[o]/50);
}


var bubbleTrace1 = {
  x: Object.keys(wardData),
  y: serviceCounts,
  text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
  mode: 'markers',
  marker: {
    color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
    size: responses
  }
};

var bubbleData = [bubbleTrace1];

var bubbleLayout = {
  // title: '311 Average Response times by ward',
  showlegend: false,
  height: 500,
  width: 500
};

Plotly.newPlot('bubble', bubbleData, bubbleLayout);