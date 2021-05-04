var apiKey = '&appid=f516944114208483a59c1cf67915c8cd';
var lat = '35.99';
var lon ='78.90';
var weatherURL = 'api.openweathermap.org/data/2.5/weather?lat=';
var searchBtn = $('#search');
var testURL = 'http://api.openweathermap.org/data/2.5/onecall?lat=35.99&lon=-78.90&exclude=minutely,hourly&appid=f516944114208483a59c1cf67915c8cd'

console.log(searchBtn)

searchBtn[0].addEventListener('click', function(){
    var temp = fetch(testURL)
        .then(function (response){
            if (response.ok) {
                response.json().then(function (data){
                    console.log(`temp`, temp);
                    console.log(`data`, data);

                })
            }
        })

});


