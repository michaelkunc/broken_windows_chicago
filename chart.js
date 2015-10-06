var years = [2010, 2011, 2012, 2013, 2014, 2015];

var crimeData2010 = [];

$.ajax({
    url: "https://data.cityofchicago.org/resource/6zsd-86xi.json?year=2010",
    dataType: 'json',
    async: false,
    success: function(results){
      crimeData2010.push(results.responseText);
      console.log(results);
    }
});

console.log(crimeData2010[0]);

var xAxis = [1,2,3,4,5],
    yAxis = [1, 2, 4, 8, 44];


 TESTER = document.getElementById('tester');
  Plotly.plot( TESTER, [{
  x: xAxis,
  y: yAxis }], {
  margin: { t: 0 } } );