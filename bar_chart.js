var rawData = [
  {
    "arrest": false,
    "beat": "0823",
    "block": "061XX S TROY ST",
    "case_number": "HY385884",
    "community_area": "66",
    "date": "2012-10-01T00:00:00.000",
    "description": "PREDATORY",
    "district": "008",
    "domestic": true,
    "fbi_code": "02",
    "id": "10198048",
    "iucr": "0266",
    "location_description": "RESIDENCE",
    "primary_type": "CRIM SEXUAL ASSAULT",
    "updated_on": "2015-08-19T15:57:18.000",
    "ward": "15",
    "year": "2012"
  },
  {
    "arrest": false,
    "beat": "2212",
    "block": "108XX S WESTERN AVE",
    "case_number": "HY386161",
    "community_area": "75",
    "date": "2012-05-07T00:01:00.000",
    "description": "FINANCIAL IDENTITY THEFT $300 AND UNDER",
    "district": "022",
    "domestic": false,
    "fbi_code": "11",
    "id": "10198661",
    "iucr": "1154",
    "location_description": "APARTMENT",
    "primary_type": "DECEPTIVE PRACTICE",
    "updated_on": "2015-08-19T15:57:18.000",
    "ward": "19",
    "year": "2012"
  },
  {
    "arrest": false,
    "beat": "0722",
    "block": "003XX W NORMAL PKWY",
    "case_number": "HY387861",
    "community_area": "68",
    "date": "2012-01-01T08:00:00.000",
    "description": "AGGRAVATED FINANCIAL IDENTITY THEFT",
    "district": "007",
    "domestic": false,
    "fbi_code": "11",
    "id": "10200322",
    "iucr": "1155",
    "location_description": "APARTMENT",
    "primary_type": "DECEPTIVE PRACTICE",
    "updated_on": "2015-08-19T15:57:18.000",
    "ward": "6",
    "year": "2012"
  },
  {
    "arrest": true,
    "beat": "1223",
    "block": "018XX W MONROE ST",
    "case_number": "HV134165",
    "community_area": "28",
    "date": "2012-01-27T11:08:00.000",
    "description": "SEX OFFENDER: FAIL REG NEW ADD",
    "district": "012",
    "domestic": false,
    "fbi_code": "26",
    "id": "8457431",
    "iucr": "4651",
    "latitude": "41.87996941",
    "location": {
      "type": "Point",
      "coordinates": [
        -87.672337,
        41.879969
      ]
    },
    "location_description": "CHA APARTMENT",
    "longitude": "-87.672336705",
    "primary_type": "OTHER OFFENSE",
    "updated_on": "2015-05-09T12:51:58.000",
    "ward": "2",
    "x_coordinate": "1164255",
    "y_coordinate": "1899544",
    "year": "2012"
  },
  {
    "arrest": false,
    "beat": "1135",
    "block": "024XX W CONGRESS PKWY",
    "case_number": "HV109690",
    "community_area": "28",
    "date": "2012-01-08T01:00:00.000",
    "description": "$500 AND UNDER",
    "district": "011",
    "domestic": false,
    "fbi_code": "06",
    "id": "8431201",
    "iucr": "0820",
    "latitude": "41.874869649",
    "location": {
      "type": "Point",
      "coordinates": [
        -87.688094,
        41.87487
      ]
    },
    "location_description": "STREET",
    "longitude": "-87.688093511",
    "primary_type": "THEFT",
    "updated_on": "2012-01-09T07:02:29.000",
    "ward": "2",
    "x_coordinate": "1159978",
    "y_coordinate": "1897653",
    "year": "2012"
  }
];

var container = {};

for (var i = 0; i < rawData.length; i ++ ){
  var num = rawData[i].primary_type;
  container[num] = container[num] ? container[num] + 1 : 1;
}

var crimes = Object.keys(container);
var crimeCounts = [];

for (var key in container) {
  if (container.hasOwnProperty(key)) {
    crimeCounts.push(container[key]);
  }
}

var data = [
  {
    x: [crimes[0], crimes[1], crimes[2]],
    y: [crimeCounts[0], crimeCounts[1], crimeCounts[2]],
    type: 'bar'
  }
];

Plotly.newPlot('myDiv', data);