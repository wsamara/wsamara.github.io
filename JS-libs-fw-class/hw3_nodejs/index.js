const request = require('request');
const argv = require('yargs').argv;
const http = require('http');
const myhost = '127.0.0.1';
const port = '3000';

let apiKey = 'c6502250111cdf2454e569d2e3e8649e';
let city = argv.c || 'san francisco';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

request(url, function (err, response, body) {
    if(err){
        console.log('error:', error);
    } else {
        let weather = JSON.parse(body)
        let message = `It's ${weather.main.temp} degrees F in ${weather.name} and the min temperature is ${weather.main.temp_min} and the max temperature is ${weather.main.temp_max}!`;
        console.log(message);
        const server = http.createServer((req, res) => {
            res.statusCode = 200;
            res.setHeader('Content-type', 'text/html');
            res.write(
                "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <title>NodeJS Weather App</title>\n" +
                "</head>\n" +
                "<body>\n" +
                "<h1>NodeJS Weather App</h1>" +
                "<h3>" + message + "</h3>" +
                "</body>\n" +
                "</html>"
            );
            res.end();
        });
        server.listen(port, myhost, () => {
            console.log('Server started on port ' + port);
        });
    }
});