var lat = '';
var lon ='';
var weatherURL = 'api.openweathermap.org/data/2.5/weather?lat=';
var searchBtn = $('#search');
var dateTime = null;
console.log(searchBtn)
var temperatureF = '';
var cityName = $('#cityName');
var apiKey = '&appid=f516944114208483a59c1cf67915c8cd';
var tempURL = 'http://api.openweathermap.org/data/2.5/onecall?lat=35.99&lon=-78.90&exclude=minutely,hourly&appid=f516944114208483a59c1cf67915c8cd'



searchBtn[0].addEventListener('click', function(){
    city = cityName[0].value.trim()
    console.log(city);
    var testURL = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=imperial'+apiKey
    var temp2 = fetch(testURL)
    .then(function (response){
        if (response.ok) {
            response.json().then(function (data2){                    
                console.log(data2);
                lat = data2.coord.lat
                console.log(lat)
                lon = data2.coord.lon
                console.log(lon);
                city = data2.name
                
                var latlonURL = 'http://api.openweathermap.org/data/2.5/onecall?lat=-'+lat+'&lon='+lon+'&exclude=minutely,hourly&appid=f516944114208483a59c1cf67915c8cd'
                    var temp = fetch(latlonURL)
                        .then(function (response){
                            if (response.ok) {
                                response.json().then(function (data){
                                    console.log(`temp`, temp);
                                    console.log(`data`, data);
                                    windSpeed = data.current.wind_speed + ' ';
                                    humidity = data.current.humidity + ' ';
                                    uvIndex = data.current.uvi;
                                    tempK = data.current.temp;
                                    tempC = tempK - 273;
                                    tempF = (tempC*1.8) + 32;
                                    console.log('tempC', tempC);                    
                                    date = moment().format('MM/DD/YYYY');
                                    // icon = data.current.weater.icon;
                                    var fiveDay = [];
                                    for (let i = 1; i < 6; i++) {
                                        $('#temperature'+[i]).text((((data.daily[i].temp.max-273)*1.8)+32).toFixed(2));
                                        $('#wind'+[i]).text(data.daily[i].wind_speed);
                                        $('#humidity'+[i]).text(data.daily[i].humidity);
                                        $('#cityDate'+[i]).text(moment().add([i]*1, 'days').format('MM/DD/YYYY'));
                                    }
                                    console.log(data.daily);
                                    console.log('fivedays of temps', fiveDay);
                                    dailyWeather();
                                })
                            
                        }
                })
                })
            }
        })
});


function dailyWeather() {
    $('#temperature').text(tempF.toFixed(2));
    $('#wind').text(windSpeed);
    $('#humidity').text(humidity);
    $('#uvIndex').text(uvIndex);    
    $('#cityDate').text(city + '  '+date + ' ');
}
function getInput() {
    cityName = $('#cityName').value
    console.log('cityname GetInput', cityName);
}
