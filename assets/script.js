var apiKey = '&appid=f516944114208483a59c1cf67915c8cd';
var lat = '35.99';
var lon ='78.90';
var weatherURL = 'api.openweathermap.org/data/2.5/weather?lat=';
var searchBtn = $('#search');
var testURL = 'http://api.openweathermap.org/data/2.5/onecall?lat=35.99&lon=-78.90&exclude=minutely,hourly&appid=f516944114208483a59c1cf67915c8cd'
var dateTime = null;
console.log(searchBtn)

searchBtn[0].addEventListener('click', function(){
    var temp = fetch(testURL)
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
                    city = 'Uptopia';
                    date = moment().format('MM/DD/YYYY');
                    // icon = data.current.weater.icon;
                    

                    
                    

                    dailyWeather();
                })
            
        }
})});


function dailyWeather() {
    $('#temperature').text(tempF.toFixed(2));
    $('#wind').text(windSpeed);
    $('#humidity').text(humidity);
    $('#uvIndex').text(uvIndex);    
    $('#cityDate').text(city + '  '+date + ' ');
}